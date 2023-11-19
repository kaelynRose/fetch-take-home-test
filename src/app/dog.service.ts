import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from './dog';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

interface SearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface Match {
  match: string;
}

interface SearchParameters {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
}

@Injectable({
  providedIn: 'root'
})

export class DogService {

  searchResult: SearchResult = {resultIds: [], total: 0};
  dogList: Dog[] = [];
  favoriteDogs: string[] = [];
  matchedDog: Dog = new Dog();
  showMatch: boolean = false;
  searchSize: number = 25;

  constructor(private http:HttpClient, private router: Router) { }
  
  getDogBreeds = () => {
    const promise = lastValueFrom(this.http.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true}));
    return promise;
  }

  getAllDogs = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?size=${this.searchSize}&sort=breed:asc`, {withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  nextDogPage = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com${this.searchResult.next}&size=${this.searchSize}`, {withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  prevDogPage = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com${this.searchResult.prev}&size=${this.searchSize}`, {withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredDogs = async (params: SearchParameters) => {
    let newParams = new HttpParams();

    if (params.breeds?.length != undefined && params.breeds?.length > 0) {
      for (let breed of params.breeds) {
        newParams = newParams.append("breeds", breed);
      }
    }

    if (params.zipCodes?.length != undefined && params.zipCodes?.length > 0) {
      for (let zip of params.zipCodes) {
        newParams = newParams.append('zipCodes', zip);
      }
    }

    if (params.ageMin != undefined && params.ageMin >= 0) {
      newParams = newParams.set('ageMin', params.ageMin.toString());
    }

    if (params.ageMax != undefined && params.ageMax >= 0) {
      newParams = newParams.set('ageMax', params.ageMax.toString());
    }

    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?${this.searchResult.next}&size=${this.searchSize}`, {params: newParams, withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  getSortedDogs = async (sortString: string) => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?sort=${sortString}&size=${this.searchSize}`, {withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  getDogs = async (searchIds?: string[]) => {
    let body: string[];
    if (searchIds) {
      body = searchIds;
    } else { body = this.searchResult.resultIds;}
    let response: Dog[];
    try {
      response = await lastValueFrom(this.http.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true}));
      this.dogList = response;
    } catch (error) {
      console.log(error);
    }
  }

  favoriteDog = (id: string) => {
    this.favoriteDogs.push(id);
  }

  unfavoriteDog = (id: string) => {
    this.favoriteDogs = this.favoriteDogs.filter(x => {x != id;})
  }

  getFavoriteDogs = () => {
    this.getDogs(this.favoriteDogs);
  }

  matchDog = async () => {
    let body: string[] = this.favoriteDogs;
    try {
      const match = await lastValueFrom(this.http.post<Match>('https://frontend-take-home-service.fetch.com/dogs/match', body, {withCredentials: true}));
      let matchBody: string[] = [match.match];
      let dogs: Dog[] = await lastValueFrom(this.http.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', matchBody, {withCredentials: true}));
      this.matchedDog = dogs[0];
      this.showMatch = true;
    } catch (error) {
      console.error(error);
    }
  }
}

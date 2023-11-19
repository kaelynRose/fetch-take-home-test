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
  sortString: string = 'breed:asc';
  filters: SearchParameters = {};
  searchSize: number = 25;
  httpParams: HttpParams = new HttpParams();

  constructor(private http:HttpClient, private router: Router) { }
  
  getDogBreeds = () => {
    const promise = lastValueFrom(this.http.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true}));
    return promise;
  }

  getAllDogs = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?size=${this.searchSize}&sort=${this.sortString}`, {withCredentials: true}));
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

  setFilters = () => {
    if (this.filters.breeds?.length != undefined && this.filters.breeds?.length > 0) {
      for (let breed of this.filters.breeds) {
        this.httpParams = this.httpParams.append("breeds", breed);
      }
    }

    if (this.filters.zipCodes?.length != undefined && this.filters.zipCodes?.length > 0) {
      for (let zip of this.filters.zipCodes) {
        this.httpParams = this.httpParams.append('zipCodes', zip);
      }
    }

    if (this.filters.ageMin != undefined && this.filters.ageMin >= 0) {
      this.httpParams = this.httpParams.set('ageMin', this.filters.ageMin.toString());
    }

    if (this.filters.ageMax != undefined && this.filters.ageMax >= 0) {
      this.httpParams = this.httpParams.set('ageMax', this.filters.ageMax.toString());
    }
  }

  getDogIds = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?sort=${this.sortString}&size=${this.searchSize}`, {params: this.httpParams, withCredentials: true}));
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
    } catch (error) {
      console.error(error);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from './dog';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

interface SearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface Match {
  match: string;
}

@Injectable({
  providedIn: 'root'
})

export class DogService {

  searchResult: SearchResult = {resultIds: [], total: 0};
  favoriteDogs: string[] = [];
  matchedDog: Dog = new Dog();

  constructor(private http:HttpClient) { }
  
  getDogBreeds = () => {
    const promise = lastValueFrom(this.http.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true}));
    return promise;
  }

  getAllDogs = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>('https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc', {withCredentials: true}));
      return this.getDogs();
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  nextDogPage = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>('https://frontend-take-home-service.fetch.com' + this.searchResult.next, {withCredentials: true}));
      return this.getDogs();
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  prevDogPage = async () => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>('https://frontend-take-home-service.fetch.com' + this.searchResult.prev, {withCredentials: true}));
      return this.getDogs();
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  getFilteredDogs(params: Object) {
    let newParams = new HttpParams();
  }

  getSortedDogs = async (sortString: string) => {
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>('https://frontend-take-home-service.fetch.com/dogs/search?sort=' + sortString, {withCredentials: true}));
      return this.getDogs();
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  getDogs = () => {
    let body: string[] = this.searchResult.resultIds;
    const response = lastValueFrom(this.http.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true}));
    return response;
  }

  favoriteDog = (id: string) => {
    this.favoriteDogs.push(id);
  }

  unfavoriteDog = (id: string) => {
    this.favoriteDogs = this.favoriteDogs.filter(x => {x != id;})
  }

  matchDog = async () => {
    let body: string[] = this.favoriteDogs;
    try {
      const match = await lastValueFrom(this.http.post<Match>('https://frontend-take-home-service.fetch.com/dogs/match', body, {withCredentials: true}));
      let matchBody: string[] = [match.match];
      this.matchedDog = await lastValueFrom(this.http.post<Dog>('https://frontend-take-home-service.fetch.com/dogs', matchBody, {withCredentials: true}));
    } catch (error) {
      console.error(error);
    }
  }

}

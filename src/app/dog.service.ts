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

@Injectable({
  providedIn: 'root'
})

export class DogService {

  searchResult: SearchResult = {resultIds: [], total: 0};

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

  getFilterDogIds(params: Object) {
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

}

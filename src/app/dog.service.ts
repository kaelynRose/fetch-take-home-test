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
      return this.getDogs(this.searchResult.resultIds);
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  nextDogPage() {
    let response: any = this.http.get('https://frontend-take-home-service.fetch.com' + this.nextString, {withCredentials: true});
    this.nextString = response.next;
    console.log(response.next);
    this.prevString = response.prev;
    response.subscribe((data: any) => {this.getDogs(data.resultIds)});
    //this.getDogs(response.resultIds);
  }

  prevDogPage() {
    let data = this.http.get('https://frontend-take-home-service.fetch.com' + this.prevString, {withCredentials: true});
    return data;
  }

  getFilterDogIds(params: Object) {
    let newParams = new HttpParams();
  }

  getDogs = (ids: string[]) => {
    let body: string[] = ids;
    const response = lastValueFrom(this.http.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true}));
    return response;
  }

}

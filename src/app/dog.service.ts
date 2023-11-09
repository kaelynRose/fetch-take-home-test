import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dog } from './dog';

@Injectable({
  providedIn: 'root'
})

export class DogService {

  constructor(private http:HttpClient) { }
  

  getAllDogIds() {
    let data = this.http.get('https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc', {withCredentials: true});
    return data;
  }

  getNextDogsIds(nextParams: string) {
    let data = this.http.get('https://frontend-take-home-service.fetch.com' + nextParams, {withCredentials: true});
    return data;
  }

  getDogs(ids: string[]) {
    let body: string[] = ids;
    let data = this.http.post('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true});
    return data;
  }
}

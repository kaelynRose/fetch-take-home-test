import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dog } from './dog';

@Injectable({
  providedIn: 'root'
})

export class DogService {

  constructor(private http:HttpClient) { }
  

  getAllDogIds(){
    let data = this.http.get('https://frontend-take-home-service.fetch.com/dogs/search', {withCredentials: true});
    return data;
  }
}

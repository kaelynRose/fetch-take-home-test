import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from './dog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DogService {

  private dogListSource = new BehaviorSubject<Array<Dog>>([]);
  currentDogList = this.dogListSource.asObservable();

  constructor(private http:HttpClient) { }

  updateDogs(dogs: Dog[]) {
    this.dogListSource.next(dogs);
  }
  
  getDogBreeds() {
    let data = this.http.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true});
    return data;
  }

  getAllDogIds() {
    let data: any = this.http.get('https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc', {withCredentials: true});
    return data;
  }

  getPageDogsIds(pageParam: string) {
    let data = this.http.get('https://frontend-take-home-service.fetch.com' + pageParam, {withCredentials: true});
    return data;
  }

  getFilterDogIds(params: Object) {
    let newParams = new HttpParams();
  }

  getDogs(ids: string[]) {
    let body: string[] = ids;
    let data = this.http.post('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true});
    data.subscribe((data: any) => {this.updateDogs(data)});
    return data;
  }

}

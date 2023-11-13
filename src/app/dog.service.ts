import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from './dog';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DogService {

  private dogListSource = new BehaviorSubject<Array<Dog>>([]);
  currentDogList = this.dogListSource.asObservable();

  nextString: string = "";
  prevString: string = "";

  constructor(private http:HttpClient) { }

  updateDogs(dogs: Dog[]) {
    this.dogListSource.next(dogs);
  }
  
  getDogBreeds = () => {
    let promise = lastValueFrom(this.http.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true}));
    return promise;
  }

  getAllDogIds() {
    let data: any = this.http.get('https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc', {withCredentials: true});
    this.nextString = data.next;
    this.prevString = data.prev;
    return data;
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

  getDogs(ids: string[]) {
    let body: string[] = ids;
    let response: any = this.http.post('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true});
    response.subscribe((data: any) => {this.updateDogs(data)});
    return response;
  }

}

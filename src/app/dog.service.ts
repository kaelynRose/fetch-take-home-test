import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from './dog';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LocationService } from './location.service';

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
  filters: SearchParameters = {zipCodes: this.locationService.zipArray};
  searchSize: number = 25;
  httpParams: HttpParams = new HttpParams();
  inFavorites: boolean = false;
  pageIndex: number = 0;

  constructor(private http:HttpClient, private router: Router, public locationService: LocationService) { }
  
  getDogBreeds = () => {
    const promise = lastValueFrom(this.http.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', {withCredentials: true}));
    return promise;
  }

  getAllDogs = async () => {
    this.clearFilters();
    try {
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?size=${this.searchSize}&sort=${this.sortString}`, {withCredentials: true}));
      this.pageIndex = 0;
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  nextDogPage = async () => {
    if (this.inFavorites) {
      this.getNextFavoriteDogs();
    } else {
      try {
        this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com${this.searchResult.next}&size=${this.searchSize}`, {withCredentials: true}));
        this.getDogs();
      } catch (error) {
        console.error(error);
      }
    }
  }

  prevDogPage = async () => {
    if (this.inFavorites) {
      this.getPrevFavoriteDogs();
    } else {
      try {
        this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com${this.searchResult.prev}&size=${this.searchSize}`, {withCredentials: true}));
        this.getDogs();
      } catch (error) {
        console.error(error);
      }
    }
  }

  showFilters = () => {
    
  }

  clearFilters = () => {
    this.locationService.zipArray = [];
    this.locationService.currentZipCode = '';
    this.locationService.distanceValue = 25;
    this.filters = {zipCodes: this.locationService.zipArray};
  }

  setFilters = async () => {
    if (this.filters.breeds?.length != undefined && this.filters.breeds?.length > 0) {
      this.httpParams = this.httpParams.set('breeds', '');
      for (let breed of this.filters.breeds) {
        this.httpParams = this.httpParams.append('breeds', breed);
      }
    }

    if (this.filters.ageMin != undefined && this.filters.ageMin >= 0) {
      this.httpParams = this.httpParams.delete('ageMin');
      this.httpParams = this.httpParams.set('ageMin', this.filters.ageMin.toString());
    }

    if (this.filters.ageMax != undefined && this.filters.ageMax >= 0) {
      this.httpParams = this.httpParams.delete('ageMax');
      this.httpParams = this.httpParams.set('ageMax', this.filters.ageMax.toString());
    }

    try {
      await this.locationService.searchLocationsForZips();
      if (this.locationService.zipArray.length != undefined && this.locationService.zipArray.length > 0) {
        this.httpParams = this.httpParams.set('zipCodes', '');
        for (let zip of this.locationService.zipArray) {
          this.httpParams = this.httpParams.append('zipCodes', zip);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  getDogIds = async () => {
    try {
      await this.setFilters();
      this.searchResult = await lastValueFrom(this.http.get<SearchResult>(`https://frontend-take-home-service.fetch.com/dogs/search?sort=${this.sortString}&size=${this.searchSize}`, {params: this.httpParams, withCredentials: true}));
      this.getDogs();
    } catch (error) {
      console.error(error);
    }
  }

  getDogs = async () => {
    let body: string[] = this.searchResult.resultIds;
    let response: Dog[];
    try {
      response = await lastValueFrom(this.http.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true}));
      this.dogList = response;
    } catch (error) {
      console.error(error);
    }
  }

  favoriteDog = (id: string) => {
    this.favoriteDogs.push(id);
  }

  unfavoriteDog = (id: string) => {
    this.favoriteDogs = this.favoriteDogs.filter((x: string) => x != id)
  }

  getFavoriteDogs = () => {
    this.inFavorites = true;
    this.searchResult.resultIds = [];
    for (let x = 0; x < this.searchSize && x < this.favoriteDogs.length; x++) {
      this.searchResult.resultIds.push(this.favoriteDogs[x]);
    }
    this.searchResult.total = this.favoriteDogs.length;
    this.searchResult.next = this.searchSize.toString();
    this.searchResult.prev = '';
    this.pageIndex = 0;
    this.getDogs();
  }

  getNextFavoriteDogs = () => {
    if (this.searchResult.next != undefined) {
      this.searchResult.resultIds = [];
      let startIndex = parseInt(this.searchResult.next);
      for (startIndex; startIndex < this.searchSize + startIndex && startIndex < this.favoriteDogs.length; startIndex++) {
        this.searchResult.resultIds.push(this.favoriteDogs[startIndex]);
      }
      this.searchResult.next = startIndex.toString();
      this.searchResult.prev = (startIndex - this.searchSize - this.searchResult.resultIds.length).toString();
      this.getDogs();      
    }
  }

  getPrevFavoriteDogs = () => {
    if (this.searchResult.prev != undefined) {
      this.searchResult.resultIds = [];
      let startIndex = parseInt(this.searchResult.prev);
      this.searchResult.next = (startIndex + this.searchSize).toString();
      for (startIndex; startIndex < this.searchSize + startIndex && startIndex < this.favoriteDogs.length; startIndex++) {
        this.searchResult.resultIds.push(this.favoriteDogs[startIndex]);
      }
      this.searchResult.prev = (startIndex - this.favoriteDogs.length).toString();
      this.getDogs();      
    }
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

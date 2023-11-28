import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBoundsOfDistance } from 'geolib';
import { lastValueFrom } from 'rxjs';
import { Location, Coordinates, GeoBoundingBox } from './location';

interface LocationSearchResult {
  results: Location[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  currentZipCode: string = "";
  zipCoords: Coordinates = {lat: 0, lon: 0};
  geoBox: GeoBoundingBox = {};
  distanceValue: number = 25;
  distanceMeters: number = this.distanceValue * 1609.34;
  zipArray: string[] = [];
  locationSearchResult: LocationSearchResult = {results: [], total: 0};

  constructor(private http:HttpClient) { }

  getCoordsFromZipCode = async () => {
    let body: string[] = [this.currentZipCode];
    let response: Location[];
    try {
      response = await lastValueFrom(this.http.post<Location[]>('https://frontend-take-home-service.fetch.com/locations', body, {withCredentials: true}));
      this.zipCoords = {lat: response[0].latitude, lon: response[0].longitude};
    } catch (error) {
      console.error(error);
    }
  }

  getBoundsFromZip = async () => {
    try {
      await this.getCoordsFromZipCode();
      let coordsArray: Coordinates[] = getBoundsOfDistance({longitude: this.zipCoords.lon, latitude: this.zipCoords.lat}, this.distanceMeters).map(x => ({
        lat: x.latitude,
        lon: x.longitude
      }));
      this.geoBox.bottom_left = coordsArray[0];
      this.geoBox.top_right = coordsArray[1];
    } catch (error) {
      console.error(error);
    }
  }

  searchLocationsForZips = async () => {
    let body;
    try {
      await this.getBoundsFromZip();
      body = {geoBoundingBox: this.geoBox};
      this.locationSearchResult = await lastValueFrom(this.http.post<LocationSearchResult>('https://frontend-take-home-service.fetch.com/locations/search', body, {withCredentials: true}));
      this.zipArray = this.locationSearchResult.results.map(x => x.zip_code);
    } catch (error) {
      console.error(error);
    }
  }

}

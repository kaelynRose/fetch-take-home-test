import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBoundsOfDistance } from 'geolib';
import { lastValueFrom } from 'rxjs';
import { Location } from './location';

interface Coordinates {
  lat: number;
  lon: number;
}
interface GeoBoundingBox {
  bottom_left: Coordinates;
  top_right: Coordinates;
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  currentZipCode: string = "";
  zipCoords: Coordinates = {lat: 0, lon: 0};
  geoBox: GeoBoundingBox = {bottom_left: {lat: 0, lon: 0}, top_right: {lat:0, lon:0}};
  distanceValue: number = 25;

  constructor(private http:HttpClient) { }

  getCoordsFromZipCode = async () => {
    let body: string[] = [this.currentZipCode];
    let response: Location[];
    try {
      response = await lastValueFrom(this.http.post<Location[]>('https://frontend-take-home-service.fetch.com/locations', body, {withCredentials: true}));
      this.zipCoords = {lat: response[0].latitude, lon: response[0].longitude};
      console.log(this.zipCoords)
    } catch (error) {
      console.error(error);
    }
  }

  getBoundsFromZip = async () => {
    try {
      await this.getCoordsFromZipCode();
      let coordsArray: Coordinates[] = getBoundsOfDistance(this.zipCoords, this.distanceValue).map(x => ({
        lat: x.latitude,
        lon: x.longitude
      }));
      this.geoBox.bottom_left = coordsArray[0];
      this.geoBox.top_right = coordsArray[1];
      console.log(this.geoBox);
    } catch (error) {
      console.error(error);
    }
  }

}

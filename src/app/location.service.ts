import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentZipCode: string = "";
  distanceValue: number = 25;

  constructor() { }
}

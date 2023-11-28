import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.css']
})
export class LocationFilterComponent {
  
  zipCode = new FormControl('', Validators.pattern('^[0-9]{5}$'));

  distanceLabel = (value: number): string  => {
    return `${value}`;
  }

  constructor(public locationService: LocationService) {}

  getZipCodeErrorMessage = () => {
    return 'Zip Code must be 5 digits long';
  }
}

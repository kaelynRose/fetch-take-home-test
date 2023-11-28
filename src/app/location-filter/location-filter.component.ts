import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.css']
})
export class LocationFilterComponent {
  
  zipCode = new FormControl('', Validators.pattern('^[0-9]{5}$'));

  constructor() {}

  getZipCodeErrorMessage = () => {
    console.error(this.zipCode.errors)
    return 'Zip Code must be 5 digits long';
  }
}

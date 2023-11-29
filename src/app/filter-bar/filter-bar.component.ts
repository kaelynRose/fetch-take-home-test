import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { FormControl, Validators } from '@angular/forms';
import { LocationService } from '../location.service';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

interface BreedCheckbox {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit{
  breedList: BreedCheckbox[] = [];
  ageMin = new FormControl('', [Validators.min(0), Validators.max(30)]);
  ageMax = new FormControl('', [Validators.min(0), Validators.max(30)]);

  constructor(public dogService: DogService, public locationService: LocationService, public offcanvas: NgbActiveOffcanvas) { }

  ngOnInit(): void {
    this.loadDogBreeds();
  }

  loadDogBreeds = async () => {
    try {
      const breeds = await this.dogService.getDogBreeds() ?? [];
      this.breedList = breeds.map(x => ({
        name: x,
        checked: false
      }))
    } catch (err) {
      console.error(err);
    }
  }

  getAgeMinErrorMessage = () => {
    if (this.ageMin.hasError('min')) {
      return `Minimum value is 0`;
    }
    return `Maximum value is ${this.ageMax.value ? this.ageMax.value : 30}`;
  }

  getAgeMaxErrorMessage = () => {
    if (this.ageMax.hasError('min')) {
      return `Minimum value is ${this.ageMin.value ? this.ageMin.value : 0}`;
    }
    return `Maximum value is 30`;
  }

  filterDogs = () => {
    this.dogService.clearFilters();
    this.dogService.filters.breeds = this.breedList.filter(x => x.checked).map(x => x.name);
    let ageMaxValue: string | null = this.ageMax.value;
    let ageMinValue: string | null = this.ageMin.value;
    if (ageMaxValue != null) {
      this.dogService.filters.ageMax = parseInt(ageMaxValue);
    }
    if (ageMinValue != null) {
      this.dogService.filters.ageMin = parseInt(ageMinValue);
    }
    if (Object.keys(this.dogService.filters).length > 0) {
      this.dogService.setFilters();
    } else {
      this.dogService.getAllDogs();
    }
  }

  clearFilters = async () => {
    this.breedList = this.breedList.map(x => ({name: x.name, checked: false}));
    this.ageMin.setValue('');
    this.ageMax.setValue('');
    this.locationService.currentZipCode = "";
    this.locationService.zipArray = [];
    this.locationService.distanceValue = 25;
    this.dogService.clearFilters();
    this.dogService.getAllDogs();
  }
}

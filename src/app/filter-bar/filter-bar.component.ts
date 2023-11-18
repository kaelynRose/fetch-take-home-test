import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { FormControl, Validators } from '@angular/forms';

interface BreedCheckbox {
  name: string;
  checked: boolean;
}

interface Filters {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
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

  constructor(private dogService: DogService) { }

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
      return `Minimum value is ${this.ageMin.value ? this.ageMin.value : 30}`;
    }
    return `Maximum value is 30`;
  }

  filterDogs = () => {
    let filters: Filters = {};
    let breedsFilter: string[] = this.breedList.filter(x => x.checked).map(x => x.name);
    let ageMaxValue: string | null = this.ageMax.value;
    let ageMinValue: string | null = this.ageMin.value;
    if (ageMaxValue != null) {
      filters.ageMax = parseInt(ageMaxValue);
    }
    if (ageMinValue != null) {
      filters.ageMin = parseInt(ageMinValue);
    }
    filters.breeds = breedsFilter;
    if (Object.keys(filters).length === 0) {
      this.dogService.getAllDogs();
    } else {
      this.dogService.getFilteredDogs(filters);
    }
  }

  clearFilters = async () => {
    this.breedList = this.breedList.map(x => ({name: x.name, checked: false}));
    this.ageMin.setValue('');
    this.ageMax.setValue('');
    this.dogService.getAllDogs();
  }
}

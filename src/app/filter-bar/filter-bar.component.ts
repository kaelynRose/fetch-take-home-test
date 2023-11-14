import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';

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

  filterDogs = () => {
    let filters: Filters = {};
    let breedsFilter: string[] = this.breedList.filter(x => x.checked).map(x => x.name);
    filters.breeds = breedsFilter;
    if (Object.keys(filters).length === 0) {
      this.dogService.getAllDogs();
    } else {
      this.dogService.getFilteredDogs(filters);
    }
  }

  clearFilters = async () => {
    this.breedList = this.breedList.map(x => ({name: x.name, checked: false}));
    try {
      await this.dogService.getAllDogs();
    } catch (error) {
      console.error(error);
    }
  }
}

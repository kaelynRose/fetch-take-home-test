import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';

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

  constructor(private dogService:DogService) { }

  ngOnInit(): void {
    let dataList: string[] = [];
    this.dogService.getDogBreeds().subscribe((data: any) => {
      dataList = data;
      this.breedList = dataList.map((x: string) => ({
        name: x,
        checked: false
      }))
    });

  }
}

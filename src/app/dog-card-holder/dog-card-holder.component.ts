import { Component, OnInit } from '@angular/core';
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';

interface SortOptions {
  text: string;
  apiString: string;
  selected: boolean;
}

@Component({
  selector: 'app-dog-card-holder',
  templateUrl: './dog-card-holder.component.html',
  styleUrls: ['./dog-card-holder.component.css']
})
export class DogCardHolderComponent implements OnInit {

  sortOptions: SortOptions[] = [
    {text:"Breed (Ascending)", apiString:"breed:asc", selected: true},
    {text:"Breed (Descending)", apiString:"breed:desc", selected: false},
    {text:"Age (Ascending)", apiString:"age:asc", selected: false},
    {text:"Age (Descending)", apiString:"age:desc", selected: false},
  ];

  sortSelect = new FormControl(this.sortOptions[0].apiString, Validators.required);

  constructor(public dogService: DogService) {}

  ngOnInit() {
    this.dogService.getAllDogs();
  }

  handlePageEvent = async (e: PageEvent) => {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      this.dogService.nextDogPage();
    } else if (e.previousPageIndex > e.pageIndex) {
      this.dogService.prevDogPage();
    } else {
      this.dogService.searchSize = e.pageSize;
      this.dogService.getAllDogs();
    }
    window.scrollTo(0,0);
  }

  sortDogs = async (e: any) => {
    if (e.target.value == this.sortOptions[0].apiString) {
      this.dogService.getAllDogs();
    } else {
      try {
        this.dogService.getSortedDogs(e.target.value);
      } catch (error) {
        console.error(error);
      }
    }
    window.scrollTo(0,0);
  }
}

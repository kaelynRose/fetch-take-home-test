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

  dogList: Dog[] = [];
  totalDogs: number = 0;
  sortOptions: SortOptions[] = [
    {text:"Breed (Ascending)", apiString:"breed:asc", selected: true},
    {text:"Breed (Descending)", apiString:"breed:desc", selected: false},
    {text:"Age (Ascending)", apiString:"age:asc", selected: false},
    {text:"Age (Descending)", apiString:"age:desc", selected: false},
  ];

  sortSelect = new FormControl(this.sortOptions[0].apiString, Validators.required);

  constructor(public dogService: DogService) {}

  ngOnInit() {
    this.loadAllDogs();
  }

  loadAllDogs = async () => {
    // Load all dogs by default
    this.dogService.getAllDogs();
  }

  handlePageEvent = async (e: PageEvent) => {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      try {
        // this.dogList = await this.dogService.nextDogPage();
      } catch (error) {
        this.dogList = [];
        console.error(error);
      }
    } else if (e.previousPageIndex > e.pageIndex) {
      try {
        // this.dogList = await this.dogService.prevDogPage();
      } catch (error) {
        this.dogList = [];
        console.error(error);
      }
    }
  }

  sortDogs = async (e: any) => {
    if (e.target.value == this.sortOptions[0].apiString) {
      this.loadAllDogs();
    } else {
      try {
        // this.dogList = await this.dogService.getSortedDogs(e.target.value);
        this.totalDogs = this.dogService.searchResult.total;
      } catch (error) {
        this.dogList = [];
        console.error(error);
      }
    }
  }
}

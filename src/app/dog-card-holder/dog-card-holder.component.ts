import { Component, OnInit } from '@angular/core';
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dog-card-holder',
  templateUrl: './dog-card-holder.component.html',
  styleUrls: ['./dog-card-holder.component.css']
})
export class DogCardHolderComponent implements OnInit {

  dogList: Dog[] = [];
  totalDogs: number = 0;

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadAllDogs();
  }

  loadAllDogs = async () => {
    // Load all dogs by default
    try {
      this.dogList = await this.dogService.getAllDogs();
      this.totalDogs = this.dogService.searchResult.total;
    } catch (error) {
      this.dogList = [];
      console.error(error);
    }
  }

  handlePageEvent = async (e: PageEvent) => {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      try {
        this.dogList = await this.dogService.nextDogPage();
      } catch (error) {
        this.dogList = [];
        console.error(error);
      }
    } else if (e.previousPageIndex > e.pageIndex) {
      try {
        this.dogList = await this.dogService.prevDogPage();
      } catch (error) {
        this.dogList = [];
        console.error(error);
      }
    }
  }
}

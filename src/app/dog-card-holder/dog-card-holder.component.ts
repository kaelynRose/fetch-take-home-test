import { Component, OnInit } from '@angular/core';
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dog-card-holder',
  templateUrl: './dog-card-holder.component.html',
  styleUrls: ['./dog-card-holder.component.css']
})
export class DogCardHolderComponent implements OnInit {

  dogList: Dog[] = [];
  totalDogs: number = this.dogService.searchResult.total ?? 0;

  dogSubscription: Subscription = new Subscription();

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadAllDogs();
  }

  loadAllDogs = async () => {
    // Load all dogs by default
    try {
      this.dogList = await this.dogService.getAllDogs();
    } catch (error) {
      this.dogList = [];
      console.error(error);
    }
  }


  handlePageEvent(e: PageEvent) {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      this.dogService.nextDogPage();
    } else if (e.previousPageIndex > e.pageIndex) {
      this.dogService.prevDogPage();
    }
  }
}

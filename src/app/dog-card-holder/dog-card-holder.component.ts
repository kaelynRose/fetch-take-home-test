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

  searchIds: string[] = [];
  nextString: string = "";
  prevString: string = "";
  dogList: Dog[] = [];
  totalDogs: number = 0;

  dogSubscription: Subscription = new Subscription();

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogSubscription = this.dogService.currentDogList.subscribe((list: Dog[]) => this.dogList = list);
    this.dogService.getAllDogIds().subscribe((data: any) => {
      this.nextString = data.next;
      this.prevString = data.prev;
      this.totalDogs = data.total;
      this.dogService.getDogs(data.resultIds);
    })
  }


  handlePageEvent(e: PageEvent) {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      this.dogService.getPageDogsIds(this.nextString).subscribe((data: any) => {
        this.searchIds = data.resultIds;
        this.nextString = data.next;
        this.prevString = data.prev;
        this.totalDogs = data.total;
        this.dogService.getDogs(this.searchIds).subscribe((data: any) => {this.dogList = data});
      })
    } else if (e.previousPageIndex > e.pageIndex) {
      this.dogService.getPageDogsIds(this.prevString).subscribe((data: any) => {
        this.searchIds = data.resultIds;
        this.nextString = data.next;
        this.prevString = data.prev;
        this.totalDogs = data.total;
        this.dogService.getDogs(this.searchIds).subscribe((data: any) => {this.dogList = data});
      })
    }
  }
}

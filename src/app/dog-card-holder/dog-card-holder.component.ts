import { Component, OnInit } from '@angular/core';
import { DogCardComponent } from '../dog-card/dog-card.component';
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dog-card-holder',
  templateUrl: './dog-card-holder.component.html',
  styleUrls: ['./dog-card-holder.component.css']
})
export class DogCardHolderComponent {

  searchIds: string[] = [];
  nextString: string = "";
  prevString: string = "";
  dogList: Dog[] = [];
  totalDogs: number = 0;

  constructor(private dogService:DogService) {}

  ngOnInit() {
    this.dogService.getAllDogIds().subscribe((data: any) => {
      this.searchIds = data.resultIds;
      this.nextString = data.next;
      this.prevString = data.prev;
      this.totalDogs = data.total;
      this.dogService.getDogs(this.searchIds).subscribe((data: any) => {this.dogList = data});
    })
  }


  handlePageEvent(e: PageEvent) {
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      this.dogService.getNextDogsIds(this.nextString).subscribe((data: any) => {
        this.searchIds = data.resultIds;
        this.nextString = data.next;
        this.prevString = data.prev;
        this.totalDogs = data.total;
        this.dogService.getDogs(this.searchIds).subscribe((data: any) => {this.dogList = data});
      })
    }
  }
}

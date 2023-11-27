import { Component } from '@angular/core';
import { DogService } from '../dog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  pageIndex: number = 0;
  
  constructor(public dogService: DogService) {}

  handlePageEvent = (e: PageEvent) => {
    this.pageIndex = e.pageIndex;
    if (e.previousPageIndex === undefined || e.pageIndex > e.previousPageIndex) {
      this.dogService.nextDogPage();
    } else if (e.previousPageIndex > e.pageIndex) {
      this.dogService.prevDogPage();
    } else {
      this.dogService.searchSize = e.pageSize;
      this.dogService.getAllDogs();
    }
    window.scrollTo(0,0);
    console.log(this.pageIndex);
  }
}

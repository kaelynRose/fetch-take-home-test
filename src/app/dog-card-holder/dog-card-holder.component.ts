import { Component, OnInit } from '@angular/core';
import { DogCardComponent } from '../dog-card/dog-card.component';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-card-holder',
  templateUrl: './dog-card-holder.component.html',
  styleUrls: ['./dog-card-holder.component.css']
})
export class DogCardHolderComponent {

  searchIds: string[] = [];
  dogList: Dog[] = [];

  constructor(private dogService:DogService) {}

  ngOnInit() {
    this.dogService.getAllDogIds().subscribe((data: any) => {
      this.searchIds = data.resultIds;
      this.dogService.getDogs(this.searchIds).subscribe((data: any) => {this.dogList = data});
    })
  }
}

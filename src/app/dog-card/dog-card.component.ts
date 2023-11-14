import { Component, Input } from '@angular/core';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.css']
})

export class DogCardComponent{
  @Input() dog?: Dog;

  constructor(private dogService: DogService) {}

  addToFavorites = (dogId: string) => {
    this.dogService.favoriteDog(dogId);
  }
}

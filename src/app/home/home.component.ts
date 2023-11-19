import { Component } from '@angular/core';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (public dogService: DogService) {}
}

import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit{

  constructor(public dogService: DogService, private router: Router) {}

  ngOnInit() {
    console.log(this.dogService.matchedDog.id);
    if (this.dogService.matchedDog.id.length == 0) {
      this.router.navigate(['home']);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from '../dog.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor (private _router: Router, public dogService: DogService, public loginService: LoginService) {}

  isMenuCollapsed: boolean = true;

  findMatch = () => {
    this.dogService.matchDog();
  }
}

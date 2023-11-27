import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from '../dog.service';
import { LoginService } from '../login.service';
import { MatchComponent } from '../match/match.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  constructor (private _router: Router, public dogService: DogService, public loginService: LoginService, public modalService: NgbModal) {}

  isMenuCollapsed: boolean = true;

  goHome = () => {
    this._router.navigate(['home']);
  }

  findMatch = async () => {
    try {
      await this.dogService.matchDog();
      this.modalService.open(MatchComponent);
    } catch (error) {
      console.error(error);
    }
  }
}

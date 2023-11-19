import { Component } from '@angular/core';
import { DogService } from '../dog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  constructor(public dogService: DogService, public activeModal: NgbActiveModal) {}

}

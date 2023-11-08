import { Component } from '@angular/core';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.css']
})
export class DogCardComponent {
  dogName: string;
  dogBreed: string;
  dogAge: number;
  dogImage: string;
  dogZip: string;
  dogId: string;

  constructor(_id:string, _img:string, _name:string, _age:number, _zip_code:string, _breed:string) {
    this.dogId = _id;
    this.dogImage = _img;
    this.dogName = _name;
    this.dogAge = _age;
    this.dogZip = _zip_code;
    this.dogBreed = _breed;
  }
}

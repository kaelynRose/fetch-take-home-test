import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  breedList = [];

  getDogBreeds = () => {
    let xhr = new XMLHttpRequest();
    let url: string = 'https://frontend-take-home-service.fetch.com/dogs/breeds'

    xhr.open("get", url);

    xhr.withCredentials = true;
    xhr.setRequestHeader("credentials", "include");

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log("All records obtained");
            this.breedList = JSON.parse(xhr.responseText);
        }
    }

    xhr.send();
  }
}

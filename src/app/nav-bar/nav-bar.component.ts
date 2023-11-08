import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor (private _router: Router) {}

  userLogout = () => {
    let xhr = new XMLHttpRequest();
    let url = `https://frontend-take-home-service.fetch.com/auth/logout`;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log("Logout successful");
            this._router.navigate(['login']);
        }
    }
    xhr.send();
  }
}

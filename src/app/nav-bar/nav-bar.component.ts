import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userLogout = () => {
    let xhr = new XMLHttpRequest();
    let url = `https://frontend-take-home-service.fetch.com/auth/logout`;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log("Logout successful");
        }
    }
    xhr.send();
  }
}

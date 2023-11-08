import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  userName: string = "";
  userEmail: string = "";
  baseURL: string = 'https://frontend-take-home-service.fetch.com';
  showComponent: boolean = true;


  getNameErrorMessage = () => {
    return 'You must enter a value';
  }

  getEmailErrorMessage = () => {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  userLogin = () => {
    let xhr = new XMLHttpRequest();
    let url = this.baseURL + '/auth/login';
    let body = {
        name : this.userName,
        email: this.userEmail
    };

    xhr.open("post", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("credentials", "include");

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log("Login Successful");
        }
    }

    xhr.send(JSON.stringify(body));
    this.showComponent = false;
  }

}

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  showComponent: boolean = true;

  constructor (private _router: Router, public loginService: LoginService) {}

  getNameErrorMessage = () => {
    return 'You must enter a value';
  }

  getEmailErrorMessage = () => {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login = () => {
    console.log('submit');
    let userName = this.name.value?.toString();
    let userEmail = this.email.value?.toString();
    if (userName && userEmail) {
      this.loginService.userLogin(userName, userEmail);
    }
  }
}

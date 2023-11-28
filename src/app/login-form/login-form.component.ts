import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor (public loginService: LoginService) {}

  getNameErrorMessage = () => {
    return 'You must enter a value';
  }

  getEmailErrorMessage = () => {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login = () => {
    if (this.name.valid && this.email.valid) {
      this.loginService.userLogin(this.name.value!.toString(), this.email.value!.toString());
    }
  }
}

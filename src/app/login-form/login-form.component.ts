import { Component } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);

  getNameErrorMessage() {
    return 'You must enter a value';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}

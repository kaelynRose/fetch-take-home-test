import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  userLogin = (userName: string, userEmail: string) => {
    let body = {
      name : userName,
      email : userEmail
    };
    try {
      this.http.post('https://frontend-take-home-service.fetch.com/dogs', body, {withCredentials: true});
      this.router.navigate(['home']);
    } catch (error) {
      console.error(error);
    }
  }

  userLogout = () => {
    try {
      this.http.get('https://frontend-take-home-service.getch.com/auth/logout');
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  userLogin = async (userName: string, userEmail: string) => {
    let body = {
      name : userName,
      email : userEmail
    };
    try {
      await this.http.post('https://frontend-take-home-service.fetch.com/auth/login', body,{withCredentials: true});
      this.router.navigate(['home']);
    } catch (error) {
      console.error(error);
    }
  }

  userLogout = async () => {
    try {
      await this.http.get('https://frontend-take-home-service.fetch.com/auth/logout');
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }
}

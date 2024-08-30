import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly baseurl = environment.baseUrl;


  userData!: any;

  setRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.signup}`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.signin}`, data);
  }

  setforgetPasswordForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.forgotPasswords}`, data);
  }


  saveUserData(): void { //save and decode the token
    if (localStorage.getItem(environment.token) != null) {
      this.userData = jwtDecode(localStorage.getItem(environment.token)!); //npm install jwt-decode
    }
  }

  signout(): void {
    localStorage.removeItem(environment.token);
    this.userData = null;
    this._router.navigate(['/login']);
  }


}

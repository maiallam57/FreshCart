import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly baseurl = Constants.baseUrl;
  private readonly signup = Constants.signup;
  private readonly signin = Constants.signin;
  private readonly forgotPasswords = Constants.forgotPasswords;


  setRegisterForm(data: object) {
    return this._httpClient.post(`${this.baseurl}${this.signup}`, data);
  }

  setLoginForm(data: object) {
    return this._httpClient.post(`${this.baseurl}${this.signin}`, data);
  }

  setforgetPasswordForm(data: object) {
    return this._httpClient.post(`${this.baseurl}${this.forgotPasswords}`, data);
  }
}

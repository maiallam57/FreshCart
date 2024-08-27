import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient = inject(HttpClient);
  private readonly baseurl = environment.baseUrl;


  setRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.signup}`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.signin}`, data);
  }

  setforgetPasswordForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${environment.forgotPasswords}`, data);
  }
}

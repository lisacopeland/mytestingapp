import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SigninResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `http://localhost:7179/auth`;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return of(password);
  }

  signUp(email: string, password: string) {
    const authenticationDetails = {
      Username: email,
      Password: password,
      Email: email,
    };
    const url = `${this.apiUrl}/register`;
    console.log('going to url ', url, 'search: ', authenticationDetails);
    const params = new HttpParams({ fromObject: authenticationDetails });
    return this.http.post<string>(url, { params });
  }

  changePassword(password: string) {
    console.log('hi from changepassword');
    localStorage.setItem('password', password);
    return of(password);
  }

  getPassword() {
    console.log('hi from getpassword');
    return of(localStorage.getItem('password'));
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const authenticationDetails = {
      RefreshToken: refreshToken,
    };
    const url = `${this.apiUrl}/refreshtoken`;
    console.log('going to url ', url, 'search: ', authenticationDetails);
    const params = new HttpParams({ fromObject: authenticationDetails });
    return this.http.post<string>(url, { params });
  }

  signOut() {
    localStorage.removeItem('jwt');
  }

  confirmSignUp(email: string, confirmationCode: string) {
    const authenticationDetails = {
      ConfirmationCode: confirmationCode,
      Email: email,
    };
    const url = `${this.apiUrl}/confirm`;
    console.log('going to url ', url, 'search: ', authenticationDetails);
    const params = new HttpParams({ fromObject: authenticationDetails });
    return this.http.post<string>(url, { params });
  }

  resendConfirmationCode(email: string) {
    const authenticationDetails = {
      Email: email,
    };
    const url = `${this.apiUrl}/resendconfirm`;
    console.log('going to url ', url, 'search: ', authenticationDetails);
    const params = new HttpParams({ fromObject: authenticationDetails });
    return this.http.post<string>(url, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  private _authUrl: string;
  private _bearerToken: string;

  constructor(private _http: HttpClient) {
    // this._authUrl = 'http://localhost:3100/auth/v1';
    this._authUrl = '/api/v1/';
    this._bearerToken = null;
  }

  authenticateUser(data): Observable<any> {
    return this._http.post(`${this._authUrl}users/signin`, data);
  }
  //as we are mapping response to request in line no.37, why we are not doing it here?
  saveUserDetails(userDetails) {
    this._bearerToken = userDetails.token;
    localStorage.setItem('bearerToken', this._bearerToken);
    localStorage.setItem('userName', userDetails.userName);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this._http.post(`${this._authUrl}users/isAuthenticated`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).map((res) => res['isAuthenticated']).toPromise();
  }
  //setting a p9roperty in header named Authorization and its value is bearer <token>,
  // token is sent in this way through request...

  registerUser(data) {
    console.log(data);
    return this._http.post(`${this._authUrl}users/register`, data);
  }
  //as we are mapping response to request in line no.37, why we are not doing it here?
  logOut() {
    this._bearerToken = null;
    localStorage.setItem('bearerToken', null);
    localStorage.setItem('userName', null);
  }

  findUserByEmail(userEmail): Observable<any> {
    return this._http.post(`${this._authUrl}users/findUserByEmail`, userEmail);
  }

  findUserByContactNo(contactNo): Observable<any> {
    return this._http.post(`${this._authUrl}users/findUserByContactNo`, contactNo);
  }

  // tslint:disable-next-line:eofline
}
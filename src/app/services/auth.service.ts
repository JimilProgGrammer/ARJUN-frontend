import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const TOKEN_NAME: string = 'jwt_token';
export const REFRESH_TOKEN_NAME: string = 'refresh_token';
export const USERNAME_KEY: string = "username";

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:5000';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  setCurrentUser(name: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, name);
  }

  getCurrentUser(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_NAME, token);
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USERNAME_KEY);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(username, password): Observable<any> {
    return this.http
      .post(`${this.url}/auth?username=`+username+`&password=`+password, {}, { headers: this.headers })
      .pipe(map((res:Response) => res.json()));
  }

  getNewJwt() {
    let refresh_token = localStorage.getItem(REFRESH_TOKEN_NAME);
    let headers = new Headers({ 'Authorization': 'Bearer ' + refresh_token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + "/refresh", refresh_token, options)
                                .pipe(map((response: Response) => response.json()));
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  private baseUrl = "http://localhost:5000";

  constructor(private http: Http, private client: HttpClient) { }

  doGetRequest(url:string): Observable<any> {
    let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    url = this.baseUrl + url;
    return this.http.get(url, options).pipe(map((res:Response) => res.json()));
  }

  doAuthorizedGet(url:string): Observable<any> {
    url = this.baseUrl + url;
    return this.client.get(url).pipe(map((res:Response) => res));
  }

  doPostRequest(url:string, postBody: any):Observable<any> {
    let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    url = this.baseUrl + url;
    return this.http.post(url, postBody, options).pipe(map((res:Response) => res.json()));
  }

}
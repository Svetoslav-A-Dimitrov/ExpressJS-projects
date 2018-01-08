import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {ToastsManager} from "ng2-toastr";
import {LoggedInfoService} from "../logged-Info/loogedInfo";

@Injectable()
export class HttpClentService {
  private httpHeaders =  new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private httpHeadersLogged;
   private token: string;

  constructor(
        private http: HttpClient,
        private toastr: ToastsManager,
        private loggedInfo: LoggedInfoService
  ) {
    this.token = localStorage.getItem('authToken');
    this.httpHeadersLogged = new HttpHeaders({
      'Content-Type' : 'application/json',
      "Authorization": 'Bearer ' + this.token
    });

  }

  get<T>(url : string) {

    return this.http.get<T>(url,{ headers: this.httpHeaders } )
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  getLogged<T>(url : string) {

    return this.http.get<T>(url,{ headers: this.httpHeadersLogged })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  postLogged<T>(url : string, body: any) {
    return this.http.post<T>(url, body, { headers: this.httpHeadersLogged })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
  post<T>(url : string, body: any) {
    return this.http.post<T>(url, body, { headers: this.httpHeaders })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  put<T>(url : string, body: any) {
    return this.http.put<T>(url, body, { headers: this.httpHeaders })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
  delete<T>(url: string) {
    return this.http.post<T>(url ,null, {headers: this.httpHeadersLogged })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: any) {
    if(err.status === 404) {
      this.toastr.error('404 not found', '404');
    }

    // Handle other status code
    return Observable.throw(new Error(err.message));
  }
}

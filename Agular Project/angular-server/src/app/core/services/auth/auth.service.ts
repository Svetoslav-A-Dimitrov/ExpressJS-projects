import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs/Subject";
import {RegisterModel} from "../../models/input-models/register.model";
import {LoginModel} from "../../models/input-models/login.model";
import {Observable} from 'rxjs/Observable';
import {HttpClentService} from "../http-client/http-clent.service";
import {Router} from "@angular/router";

const serverUrl = 'http://localhost:5000';

@Injectable()
export class AuthService {
  user: object;
  public redirectUrl : string;

  // loggedInfo = new Subject<boolean>();

  constructor(private http: HttpClentService, private router : Router) { }
  login(data : LoginModel) : Observable<Object> {
    return this.http.post(serverUrl + '/auth/login', data);
  }
  register(data : RegisterModel) : Observable<Object> {
    return this.http.post(serverUrl + '/auth/signup', data);
  }


  isLoggedIn() : boolean {
    if(localStorage.getItem('authToken')) {
      return true;
    }
      return false;
  }

  tryNavigate(): void {
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      return;
    }
      this.router.navigate([`/wishlist`]);
  }
  // elevateData(data) {
  //   this.loggedInfo.next(data);
  // }
}

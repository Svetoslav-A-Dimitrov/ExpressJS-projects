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
export class LoggedInfoService {

  constructor(
    private router: Router
  ) {}

  loggedInfo = new Subject<boolean>();

  elevateData(data) {
    this.loggedInfo.next(data);
  }

  isLoggedIn() : boolean {
    if(localStorage.getItem('authToken')) {
      return true;
    }
    return false;
  }
}

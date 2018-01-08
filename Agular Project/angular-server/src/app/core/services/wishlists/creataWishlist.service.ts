/**
 * Created by sve on 12.12.2017 г..
 */
/**
 * Created by sve on 9.12.2017 г..
 */
import { Injectable } from '@angular/core';
import {WishlistViewModel} from "../../models/view-models/wishlist-view.models";
import {Observable} from "rxjs/Observable";
import {HttpClentService} from "../http-client/http-clent.service";
import {Subject} from "rxjs/Subject";


const serverUrl = 'http://localhost:5000';
@Injectable()
export class CreateWishlistService {

  constructor(
      private http : HttpClentService
  ) {}

  creartWishlist(data : WishlistViewModel) : Observable<Object> {
     return this.http.postLogged(serverUrl + '/wishlist/create', data);

  }
}


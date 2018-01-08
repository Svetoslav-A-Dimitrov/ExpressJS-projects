/**
 * Created by sve on 9.12.2017 г..
 */
import { Injectable } from '@angular/core';
import {HttpClentService} from "../http-client/http-clent.service";
import {Observable} from "rxjs/Observable";

const serverUrl = 'http://localhost:5000';
@Injectable()
export class WishlistService {

  constructor(private http : HttpClentService) {

  }

  getWishlists(page): Observable<Object> {
    return this.http.get(serverUrl + '/wishlist/all?page=' + page);
  }

  getById(wishlistId: number): Observable<Object> {
    return this.http.getLogged(serverUrl + '/wishlist/details/' + wishlistId);
  }

  getMine(): Observable<Object> {
    return this.http.getLogged(serverUrl + '/wishlist/mine');
  }

  total(): Observable<Object> {
    return this.http.get(serverUrl + '/wishlist/total');
  }

  delete(wishlistId) {
     return this.http.delete(serverUrl + '/wishlist/delete/' + wishlistId);
  }

}


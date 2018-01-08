/**
 * Created by sve on 14.12.2017 г..
 */
import {WishlistService} from '../../../core/services/wishlists/wishlists.service';

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyWishlistComponents} from "./index";
import {RouterModule} from "@angular/router";
import {wishlistsPaths} from "../wishlists/wishlist-routing";




@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...MyWishlistComponents
  ],
  providers:[
    WishlistService
  ]
})
export class MyWishlistModule {  }

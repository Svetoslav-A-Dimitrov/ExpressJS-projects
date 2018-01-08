import {WishlistService} from '../../../core/services/wishlists/wishlists.service';

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {wishlistComponents} from "./index";
import {RouterModule} from "@angular/router";
import {wishlistsPaths} from "./wishlist-routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(wishlistsPaths)
  ],
  declarations: [
    ...wishlistComponents
  ],
  providers:[
    WishlistService
  ]
})
export class WishlistsModule {  }

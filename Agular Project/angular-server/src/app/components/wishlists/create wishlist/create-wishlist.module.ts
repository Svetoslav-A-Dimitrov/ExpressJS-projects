/**
 * Created by sve on 11.12.2017 г..
 */
import {WishlistService} from '../../../core/services/wishlists/wishlists.service';

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {createWishlistComponents} from "./index";
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ...createWishlistComponents
  ],
  providers:[
    WishlistService
  ]
})
export class CreateWishlistModule {  }

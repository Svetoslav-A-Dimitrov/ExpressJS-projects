/**
 * Created by sve on 3.12.2017 г..
 */
import {Component} from '@angular/core';
import {WishlistViewModel} from "../../../../core/models/view-models/wishlist-view.models";
import {CreateWishlistService} from "../../../../core/services/wishlists/creataWishlist.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  templateUrl: './create.wishlist.component.html',
  styleUrls: ['./create.wishlist.component.css']
})
export class CreateWishListComponent {
  public wishlistModel: WishlistViewModel;
  private author = localStorage.getItem('username');
  private totlaWishes = 0;
  constructor(
    private service : CreateWishlistService,
    private router : Router,
    private toastr: ToastsManager
  ) {
    this.wishlistModel = new WishlistViewModel(localStorage.getItem('email'),'', '', this.author, '', '');
  }

  createWishlist(): void {
    this.service.creartWishlist(this.wishlistModel)
      .subscribe(data => {
        this.toastr.success('Created');
        this.router.navigate(['/wishlist']);
      });
  }

  hide(e) {
    e.target.hidden = true;
  }

}


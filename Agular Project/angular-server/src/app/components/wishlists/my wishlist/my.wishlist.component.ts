/**
 * Created by sve on 3.12.2017 г..
 */
import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../../../core/services/wishlists/wishlists.service";
import {WishlistViewModel} from "../../../core/models/view-models/wishlist-view.models";

@Component({
  templateUrl: './my-wishlist.html',
  styleUrls: ['./my-wislist.css']
})
export class MyWishlistComponent implements OnInit {
  myWishes: WishlistViewModel[];
  wishesperPage : WishlistViewModel[];
  wishesExist = false;
  startIndex = 0;
  endIndex = 2;
  private title = 'List of my whishes'


  constructor(private wishlisService: WishlistService ) {}

  ngOnInit() {
    this.wishlisService.getMine()
      .subscribe((data: any) => {
        console.log(data);
        this.wishesperPage = data.slice(this.startIndex, this.endIndex);
        this.myWishes = data;
        if(data.length > 0) {
          this.wishesExist = true;
        }
      });
  }

  goToPrevPage() {
    if(this.startIndex < 1) {
      return;
    }
    this.startIndex = this.startIndex - 2;
    this.endIndex = this.endIndex - 2; // 2 limit items per page
    this.wishesperPage = this.myWishes.slice(this.startIndex, this.endIndex);

  }
  goToNextPage() {
    if(this.myWishes.length/2  < this.startIndex) {
      return ;
    }

    this.startIndex = this.startIndex + 2;
    this.endIndex = this.endIndex + 2; // 2 limit items per page
    this.wishesperPage = this.myWishes.slice(this.startIndex, this.endIndex);

  }
}

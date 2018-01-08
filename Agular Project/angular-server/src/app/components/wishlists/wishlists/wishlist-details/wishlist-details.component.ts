import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../../../../core/services/wishlists/wishlists.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WishlistViewModel} from "../../../../core/models/view-models/wishlist-view.models";
import {Location} from '@angular/common';

@Component({
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.css']
})

export class WishlistDetailsComponent implements OnInit {
  public wishlist: WishlistViewModel;

  constructor(
    private wishlisService: WishlistService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id: number = Number(this.activateRoute.snapshot.params['id']);
    this.wishlisService.getById(id)
      .subscribe((data: any) => {
        this.wishlist = data;
      });
  }

  goBack() {
    this.router.navigate(['/wishlist']);
  }
}

/**
 * Created by sve on 3.12.2017 г..
 */
import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../../../../core/services/wishlists/wishlists.service";
import {WishlistViewModel} from "../../../../core/models/view-models/wishlist-view.models";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent implements OnInit {
  public wishlists : WishlistViewModel[];
  private wishesExist = false;
  private page = 1;
  private length: number;
  private totalWishes = 0;


  constructor(
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager
  ) {}
  ngOnInit() {

    this.wishlistService.getWishlists(1)
      .subscribe((data: any)=> {
        this.wishlists = data;
        if(data.length > 0) {
          this.wishesExist = true;
        }
      });
    this.wishlistService.total().subscribe(total => {
      this.totalWishes = Number(total);
    });

    this.page =
      this.route.snapshot.queryParams.page ? (this.route.snapshot.queryParams.page > 0 ? this.route.snapshot.queryParams.page : 1) : 1;
    this.router.navigate(['/wishlist'], { queryParams: { page: this.page } });
    this.wishlistService.getWishlists(this.page)
     .subscribe((result: WishlistViewModel[]) => {
       result ? this.length = result.length : this.length = 0; });
  }

  goToNextPage(): void {
    if (this.page >= this.totalWishes/2) {
        this.toastr.info('Тhere are no more cars to show you');
      return;
    }
    this.router.navigate(['/wishlist'], { queryParams: { page: ++this.page } });
    this.wishlistService.getWishlists(this.page).subscribe((data: any)=> {
      this.wishlists = data;
    });
  }

  goToPrevPage() {
    if (this.page === 1) {
      this.toastr.info('There is no previous page to show you!');
      return;
    }
    this.router.navigate(['/wishlist'], { queryParams: { page: --this.page } });
    this.wishlistService.getWishlists(this.page).subscribe((data: any)=> {
      this.wishlists = data;
    });
  }

  delete(id) {
    this.wishlistService.delete(id).subscribe(res => {
      this.toastr.error('Deleted');
      this.router.navigate(['/wishlist-refresh']);
    });
  }

  isAdmin() {
    if(localStorage.getItem('email') === 'admin@admin.admin') {
      return true;
    }else {
      return false;
    }
  }
}

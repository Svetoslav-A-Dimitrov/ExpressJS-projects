/**
 * Created by sve on 9.12.2017 г..
 */
import {WishlistsComponent} from "./wishlists-list/wishlists.component";
import {WishlistDetailsComponent} from "./wishlist-details/wishlist-details.component";
import {AuthGuard} from "../../../core/guards/auth/auth.guard";

export const wishlistsPaths = [
  {path: '', component: WishlistsComponent, pathMatch: 'full'},
  {path: 'details/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: WishlistDetailsComponent}
];

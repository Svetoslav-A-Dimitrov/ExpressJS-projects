import {HttpClentService} from "./http-client/http-clent.service";
import {AuthService} from "./auth/auth.service";
import {CreateWishlistService} from "./wishlists/creataWishlist.service";
import {WishlistService} from "./wishlists/wishlists.service";
import {LoggedInfoService} from "./logged-Info/loogedInfo";
/**
 * Created by sve on 8.12.2017 г..
 */
export const allServices = [
  AuthService,
  HttpClentService,
  CreateWishlistService,
  WishlistService,
  LoggedInfoService
];

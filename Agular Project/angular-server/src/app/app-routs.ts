/**
 * Created by sve on 3.12.2017 г..
 */
import {Routes} from '@angular/router';
import {LoginComponent} from "./components/auth/login-form/login-form/login.component";
import {RegisterComponent} from "./components/auth/register-form/register.component";
import {NotFoundComponent} from "./components/shared/not found/not.found.component";
import {AuthGuard} from "./core/guards/auth/auth.guard";
import {CreateWishListComponent} from "./components/wishlists/create wishlist/create/create.wishlist.component";
import {MyWishlistComponent} from "./components/wishlists/my wishlist/my.wishlist.component";
import {BackAuthGuard} from "./core/guards/back-auth/back-auth.guard";


export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', canActivate: [BackAuthGuard], component: LoginComponent},
  {path: 'register',canActivate: [BackAuthGuard] ,component: RegisterComponent},
   {path: 'createWishList', canActivate: [AuthGuard], component: CreateWishListComponent},
   {path: 'myWishList', canActivate: [AuthGuard], component: MyWishlistComponent},
   { path: 'wishlist',
     loadChildren: "app/components/wishlists/wishlists/wishlist.module#WishlistsModule",
   },
  { path: 'wishlist-refresh',
    loadChildren: "app/components/wishlists/wishlists/wishlist.module#WishlistsModule",
  },
  {path: '**', component: NotFoundComponent},
];


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
// import {HomeComponent} from "./components/home/home.component";

import { routes } from "./app-routs";

import {AuthenticationModule} from "./components/auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ServiceModule} from "./core/services/services.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./components/shared/shared.module";
import {RouterModule} from '@angular/router';
import {GuardsModule} from "./core/guards/guards.module";
import {CreateWishlistModule} from "./components/wishlists/create wishlist/create-wishlist.module";
import {MyWishlistModule} from "./components/wishlists/my wishlist/my-wishlist.module";




@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    HttpClientModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ServiceModule,
    SharedModule,
    GuardsModule,
    CreateWishlistModule,
    MyWishlistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

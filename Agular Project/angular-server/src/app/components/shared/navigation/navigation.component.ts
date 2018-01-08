/**
 * Created by sve on 3.12.2017 г..
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {LoggedInfoService} from "../../../core/services/logged-Info/loogedInfo";

@Component({
  selector: 'app-navigation',
  template: `
    <nav>
      <a routerLink="/wishlist" routerLinkActive="active">Home</a>
      <a *ngIf="!isLogged" [routerLink]="['/login']" routerLinkActive="active">Login</a>
      <a *ngIf="!isLogged" routerLink="/register" routerLinkActive="active">Register</a>
      <a *ngIf="isLogged" routerLink="/createWishList" routerLinkActive="active">Create Wish List</a>
      <div *ngIf="!isAdmin()">
        <a *ngIf="isLogged" routerLink="/myWishList" routerLinkActive="active">My Wish List</a>
      </div>
      <!--<a *ngIf="isLogged" routerLink="/wishLists" routerLinkActive="active">Wish Lists</a>-->
      <a *ngIf="isLogged" href="javascript:void(0)" (click)="onLogout()">Logout</a>
      <a class="username">Welcome {{username}}</a>
    </nav>`,
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  username: string;
  isLogged: boolean;
  constructor(
    private loggedInfo: LoggedInfoService,
    private auth: AuthService
  ) {
     this.isLogged = loggedInfo.isLoggedIn();

    this.loggedInfo.loggedInfo.subscribe((data: any)=> {
      this.isLogged = data.isLogged;
      this.username = data.username;
      if(!this.username) {
        this.username = 'guest';
      }
    });
  }

  onLogout() {
    localStorage.clear();
    this.loggedInfo.elevateData({isLogged: false, username: null, token: null});
    this.auth.tryNavigate();
    // this.router.navigate(['/login']);
    }


  ngOnInit() {
    this.username = localStorage.getItem('username');
    if(!this.username) {
      this.username = 'guest';
    }
  }

  isAdmin() {
    return localStorage.getItem('email') === 'admin@admin.admin';
  }
}

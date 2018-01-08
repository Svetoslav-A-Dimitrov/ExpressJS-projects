/**
 * Created by sve on 14.12.2017 г..
 */
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class BackAuthGuard implements CanActivate {
  constructor(
    private router : Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfLogged(state.url);
  }

  checkIfLogged(url : string) : boolean {
    if(!this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url
    this.router.navigate(['/wishlist']);
    return false;
  }
}

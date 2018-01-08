/**
 * Created by sve on 8.12.2017 г..
 */
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router : Router,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfLogged(state.url);
  }

  checkIfLogged(url : string) : boolean {
      if(this.auth.isLoggedIn()) {
        return true;
      }

    this.auth.redirectUrl = url;
    this.router.navigate(['/login']);
      return false;
  }
}

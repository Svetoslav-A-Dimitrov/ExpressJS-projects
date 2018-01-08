/**
 * Created by sve on 3.12.2017 г..
 */
import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {LoginModel} from "../../../../core/models/input-models/login.model";
import {ToastsManager} from "ng2-toastr";
import {LoggedInfoService} from "../../../../core/services/logged-Info/loogedInfo";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public loginModel: LoginModel;
  sub$;
  constructor(
    private auth: AuthService,
    private toastr : ToastsManager,
    private loggedInfo: LoggedInfoService
  )  {
    this.loginModel= new LoginModel(-1,'', '');
  }

  ngOnDestroy() {
    if(this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  login() : void {
   // const user = {email: 'mail@mail.com', password: '12345'};
    this.sub$ = this.auth.login(this.loginModel)
      .subscribe((data: any) => {
      if(data.success) {
        this.toastr.info(data.message);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('email', data.user.email);
        this.auth.tryNavigate();


        this.loggedInfo.elevateData({isLogged: true, username: data.user.name, token: data.token});
      }else {
        this.toastr.error(data.message);
      }
      });
  }
}

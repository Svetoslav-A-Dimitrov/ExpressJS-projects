/**
 * Created by sve on 3.12.2017 г..
 */
import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";

import { RegisterModel } from '../../../core/models/input-models/register.model';
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
  templateUrl: './/register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterComponent implements OnDestroy {
  public model: RegisterModel;

  sub$;
  constructor(
    private auth: AuthService,
    private toastr : ToastsManager,
    private router : Router
  ) {
    this.model = new RegisterModel('', '', '');
  }

  ngOnDestroy() {
    if(this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  register() {
    this.sub$ = this.auth.register(this.model)
      .subscribe((data: any) => {
         this.toastr.info(data.message);
        if(data.success) {
          this.router.navigate(['/login']);
        }
      });
  }
  hide(e) {
    e.target.hidden = true;
  }
}

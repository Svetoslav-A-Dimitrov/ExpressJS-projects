/**
 * Created by sve on 7.12.2017 г..
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {authComponents} from "./index";

@NgModule({
  declarations: [
    ...authComponents
  ],

  imports: [
    CommonModule,
    FormsModule,
  ],
  // exports: [
  //   ...authComponents
  // ],
  // providers: [
  //   AuthService
  // ]
})
export class AuthenticationModule {  }

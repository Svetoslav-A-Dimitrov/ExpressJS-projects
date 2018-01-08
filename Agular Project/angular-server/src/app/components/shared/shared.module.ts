/**
 * Created by sve on 8.12.2017 г..
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {sharedComponents} from "./index";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ...sharedComponents
  ],

  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class SharedModule {  }

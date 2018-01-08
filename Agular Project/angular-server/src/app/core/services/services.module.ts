/**
 * Created by sve on 8.12.2017 г..
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {allServices} from './index';
@NgModule({
  imports: [
    CommonModule
  ],
  providers:[...allServices]
})

export class ServiceModule {}

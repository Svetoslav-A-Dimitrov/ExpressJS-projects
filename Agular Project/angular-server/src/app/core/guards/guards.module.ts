/**
 * Created by sve on 8.12.2017 г..
 */
import { NgModule } from '@angular/core';
import {allGuards} from "./index";

@NgModule({
  providers:[...allGuards]
})
export class GuardsModule {}

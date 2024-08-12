import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhoneValidatorDirective} from "./directives/phone-validator.directive";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    PhoneValidatorDirective,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class SharedModule { }

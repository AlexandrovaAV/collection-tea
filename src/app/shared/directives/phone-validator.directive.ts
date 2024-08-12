import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from "@angular/forms";

export function phoneValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = new RegExp(pattern).test(control.value);
    return result ? null : {pattern: {value: control.value}};
  }
}

@Directive({
  selector: '[phoneValidatorDirective]',
  providers: [
    {provide: NG_VALIDATORS, useClass: PhoneValidatorDirective, multi: true}
  ]
})
export class PhoneValidatorDirective {

  @Input('phoneValidator') pattern = '';
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return phoneValidator(this.pattern)(control);
  }

}

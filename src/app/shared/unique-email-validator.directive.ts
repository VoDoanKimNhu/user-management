import { AbstractControl, AsyncValidator, ValidationErrors, Validators } from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appUniqueEmailValidator]'
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor() { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }

}

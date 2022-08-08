import { AbstractControl, FormControlName, FormGroup } from "@angular/forms";

export class ValidatorField {

  static MustMatch(controlName: string, matchingControlName: string){
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors["mustMatch"]){
        return null;
      }

      if (control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }
}

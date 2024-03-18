import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface RegisterUserCommand {
  email: string;
  password: string;
  displayName: string;
}

export interface RegisterFormModel {
  email: string;
  password: string;
  displayName: string;

}

export interface RegisterFormControls {
  email: AbstractControl | null;
  password: AbstractControl | null;
  displayName: AbstractControl | null;
}

export class RegisterFormHelper {
  static createForm(fb: FormBuilder, item?: RegisterFormModel) {
    const formGroup = fb.group({
      email: [item ? item.email : null, [Validators.required]],
      password: [item ? item.password : null, [Validators.required]],
      displayName: [item ? item.displayName : null, [Validators.required]],
    });

    return formGroup;
  }

  static buildFormValues(form: FormGroup): RegisterFormControls {
    return {
      email: form.get('email'),
      password: form.get('password'),
      displayName: form.get('displayName')
    };
  }

  static getFormModel(form: FormGroup): RegisterFormModel | null {
    if (form.valid) {
      return form.getRawValue() as RegisterFormModel;
    } else {
      return null;
    }
  }
}

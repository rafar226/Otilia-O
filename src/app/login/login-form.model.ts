import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface LoginUserCommand {
  email: string;
  password: string;
}

export interface LoginFormModel {
  email: string;
  password: string;
}

export interface LoginFormControls {
  email: AbstractControl | null;
  password: AbstractControl | null;
}

export class LoginFormHelper {
  static createForm(fb: FormBuilder, item?: LoginFormModel) {
    const formGroup = fb.group({
      email: [item ? item.email : null, [Validators.required]],
      password: [item ? item.password : null, [Validators.required]],
    });

    return formGroup;
  }

  static buildFormValues(form: FormGroup): LoginFormControls {
    return {
      email: form.get('email'),
      password: form.get('password'),
    };
  }

  static getFormModel(form: FormGroup): LoginFormModel | null {
    if (form.valid) {
      return form.getRawValue() as LoginFormModel;
    } else {
      return null;
    }
  }
}

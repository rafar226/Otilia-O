import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormControls, LoginFormHelper, LoginFormModel, LoginUserCommand } from './login-form.model';
import { AuthService } from '../services';
import { Subject } from 'rxjs';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  controls!: LoginFormControls;
  submitted = false;
  invalidUser = false;
  loader = false;
  unsubscribe$ = new Subject<void>();
  private auth = inject(Auth);

  constructor(public router: Router, private authService: AuthService, private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
  }

  ngOnInit() {
    this.loginForm = LoginFormHelper.createForm(this.fb);
    this.controls = LoginFormHelper.buildFormValues(this.loginForm);
  }

  onSubmit(userForm: LoginFormModel) {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    if (userForm) {
      const loginUserCommand = {
        email: userForm.email,
        password: userForm.password,
      } as LoginUserCommand;

      signInWithEmailAndPassword(
        this.auth,
        userForm.email,
        userForm.password
      )
      .then((user: any) => {
          if (user) {
            this.router.navigate(['']);
          }
          else {
            return;
          }
        })
    } else {
      this.router.navigate(['/login']);
    }
  }

  register() {
    this.router.navigate(['./register'])
  }

  home() {
    this.router.navigate([''])
  }
}

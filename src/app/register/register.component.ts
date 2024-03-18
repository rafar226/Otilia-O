import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { Subject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UsersService } from '../services/users.service';
import { RegisterFormControls, RegisterFormHelper, RegisterFormModel, RegisterUserCommand } from './register-form.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  controls!: RegisterFormControls;
  submitted = false;
  invalidUser = false;
  loader = false;
  unsubscribe$ = new Subject<void>();
  private auth = inject(Auth);

  constructor(
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
  }

  ngOnInit() {
    this.registerForm = RegisterFormHelper.createForm(this.fb);
    this.controls = RegisterFormHelper.buildFormValues(this.registerForm);
  }

  async onSubmit(userForm: RegisterFormModel) {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return;
    }

    if (userForm) {
      const registerUserCommand = {
        email: userForm.email,
        password: userForm.password,
        displayName: userForm.displayName
      } as RegisterUserCommand;

      const userCredential = await createUserWithEmailAndPassword(this.auth, userForm.email, userForm.password);
      await sendEmailVerification(userCredential.user).then((result) => {
        this.userService.addNewUser(userCredential.user, userForm.displayName);
        updateProfile(userCredential.user, { displayName: userForm.displayName });
        this.router.navigate([''])
      })


    } else {
      this.router.navigate(['/Register']);
    }
  }

  login() {
    this.router.navigate(['./login'])
  }

  home() {
    this.router.navigate([''])
  }
}

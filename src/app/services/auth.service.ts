import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

import { BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SuccessfulRegistrationMessageComponent } from '../components/modals/successful-registration-message/successful-registration-message.component';
// import { UsersService } from 'src/app/features/users/services/users.service';
import { LoginUserCommand } from '../login/login-form.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);

  private auth = inject(Auth);
  private router = inject(Router);
  // private userService = inject(UsersService)

  userState$(): Observable<User | null> {
    return authState(this.auth);
  }

  constructor(
    private modalService: NgbModal,
    private userService: UsersService) {}

  signIn(loginCommand: LoginUserCommand) {
    try {
      signInWithEmailAndPassword(
        this.auth,
        loginCommand.email,
        loginCommand.password
      )
      // .then(userCredential => {
      //   return userCredential.user;
      // })
      .catch((error: any) => {
        throw error;
      })
    } catch (err) {
      console.error('err: ', err);
      throw err;
    }
  }

  async logOut(): Promise<void> {
    try {
      this.auth.signOut().then(() => {
        this.router.navigate(['']);
        setTimeout(() => {
          location.reload();
        }, 200)
      });
    } catch (err) {
      console.error('err', err);
    }
  }

  async register(email: string, pass: string, displayName: string): Promise<void>{
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, pass);
      await sendEmailVerification(userCredential.user).then((result) => {
        this.userService.addNewUser(userCredential.user, displayName);
        updateProfile(userCredential.user, { displayName: displayName });
        this.router.navigate(['/'])
      })
    } catch(err){
      console.log('err', err)
    }
  }


  // showSuccessfulRegistrationModal(nickname: string): void {
  //   const modalRef = this.modalService.open(
  //     SuccessfulRegistrationMessageComponent,
  //     {
  //       ariaLabelledBy: 'modal-basic-title',
  //       centered: true,
  //       size: 'md',
  //     }
  //   );
  //   modalRef.componentInstance.nickname = nickname;
  // }
}

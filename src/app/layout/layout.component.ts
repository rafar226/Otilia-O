import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared/loader';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { User } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UserOtilia } from '../shared/user-Otilia.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit{
  loader = false;
  text = '';
  user: User | null = null;

  unsubscribe$ = new Subject<void>();
  collapsed = false;
  userOtilia: UserOtilia | undefined = undefined;

  private destroy$ = new Subject<boolean>();

  constructor(
    private loaderService: LoaderService,
    public router: Router,
    private authService: AuthService,
    private firestore: Firestore,
    private userService: UsersService) {

    this.authService
      .userState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((user) => {
          if (user) {
            this.getCurrentUserOtilia();
            this.user = user;
          }
        })
      )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
    this.destroy$.next(true);
  }

  ngOnInit() {
    this.userService.currentUserOtilia$.pipe(takeUntil(this.destroy$)).subscribe(userOtilia => {
      this.userOtilia = userOtilia;
    });
  }

  collapse(e?: any) {
    this.collapsed = !this.collapsed;
  }

  getCurrentUserOtilia() {
    const createdUserRef = collection(this.firestore, 'Users');
    const users = collectionData(createdUserRef, {idField: 'id'}) as Observable<UserOtilia[]>
    users.subscribe(users => {
      const current = users.find(user => user.uid === this.user?.uid);
      if(current) {
        this.userService.setCurrentUserOtilia(current);
      }
    });
  }

}

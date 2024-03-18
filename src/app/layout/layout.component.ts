import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  collapedSideBar = false;
  loader = false;
  text = '';
  user: User | null = null;

  unsubscribe$ = new Subject<void>();

  private destroy = new Subject<boolean>();

  constructor(
    private loaderService: LoaderService,
    public router: Router,
    private authService: AuthService) {
    this.loaderService.loaderResponse$.pipe(takeUntil(this.destroy)).subscribe(status => {
      this.loader = status;
    });
    this.loaderService.loaderText$.pipe(takeUntil(this.destroy)).subscribe(text => {
      this.text = text;
    });

    this.authService
      .userState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((user) => {
          if (user) {
            this.user = user;
          }
        })
      )
    .subscribe();
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
    this.destroy.next(true);
  }

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }
}

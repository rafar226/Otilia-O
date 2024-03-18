import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  companyLogo = '';
  pushRightClass = '';
  logginStatus = '';
  @Input() user: User | null = null;

  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
  }

  logIn() {
    this.router.navigate(['./login'])
  }

  logout() {
    this.authService.logOut();
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    this.isToggled();
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }
}

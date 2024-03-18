import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() collapsedEvent = new EventEmitter<boolean>();
  @Input() user: User | null = null;

  isActive = false;
  collapsed = false;
  showMenu = '';
  pushRightClass = '';

  private destroy$ = new Subject<boolean>();

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.isActive = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.toggleCollapsed();
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    this.toggleCollapsed();
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  // rltAndLtr() {
  //     const dom: any = document.querySelector('body');
  //     dom.classList.toggle('rtl');
  // }

  changeLang(language: string) {
    console.log('lenguaje')
  }

  logIn() {
    this.router.navigate(['./login'])
  }

  logout() {
    this.authService.logOut();
  }
}

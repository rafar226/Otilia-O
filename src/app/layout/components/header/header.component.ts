import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('toggler', { static: true }) toggler!: ElementRef;

  @Input() user: User | null = null;
  @Input() collapsed: boolean = false;

  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.toggler)
  }

  logIn() {
    this.router.navigate(['./login']);
    this.changeToggleStatus();
    // this.collapsedEvent.emit(false)
  }

  logout() {
    this.authService.logOut();
    this.changeToggleStatus();
    // this.collapsedEvent.emit(false)
  }

  savedChatsWarning() {
    this.changeToggleStatus();

    if(!this.user) {
      Swal.fire({
        title: "Please log in to see your saved chats",
        showCancelButton: true,
        confirmButtonText: "Go to log in",
        confirmButtonColor: 'rgb(215, 137, 179)',
        cancelButtonColor: 'rgb(117, 97, 146)'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'])
        } else {
          this.router.navigate(['/'])
        }
      });
    }
  }

  changeToggleStatus(){
    this.toggler.nativeElement.dispatchEvent(new Event('click'))
  }
}

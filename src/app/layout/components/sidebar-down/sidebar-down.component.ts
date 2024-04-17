import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-down',
  templateUrl: './sidebar-down.component.html',
  styleUrls: ['./sidebar-down.component.scss']
})
export class SidebarDownComponent {
  @Input() user: User | null = null;
  @Input() collapsed: boolean = false;
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
  }

  collapsedEventEmitter() {
    this.collapsedEvent.emit(false)
  }

  logIn() {
    this.router.navigate(['./login']);
    this.collapsedEvent.emit(false)

  }

  logout() {
    this.authService.logOut();
    this.collapsedEvent.emit(false)
  }

  savedChatsWarning() {
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

}

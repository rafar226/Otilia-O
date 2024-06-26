import { Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { UsersService } from 'src/app/services/users.service';
import { UserOtilia } from 'src/app/shared/user-Otilia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() user: User | null = null;
  userOtilia: UserOtilia | undefined = undefined;

  // private destroy$ = new Subject<boolean>();

  constructor(
    public router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {
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
        }else {
          this.router.navigate(['/'])
        }
      });
    }
  }

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

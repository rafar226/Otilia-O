import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChatService } from 'src/app/features/chat/chat.service';
import { AuthService } from 'src/app/services';
import { ToastService } from 'src/app/shared/components/toast';
import Swal from 'sweetalert2'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  newMessage: string = '';
  user: User | null = null;

  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private chatService: ChatService
  ) {
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

  ngOnInit() {
  }

  send(text: string) {
    if(text === '') {
      return;
    }

    if(!this.user) {
      Swal.fire('Please log in to use our chat.')
      return;
    }

    this.newMessage = '';
    this.chatService.shareData(text);
    this.router.navigate(['./chat']);
  }
}

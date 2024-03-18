import { Component, Input } from '@angular/core';
import { ChatService } from './chat.service';
import { Conversation } from './conversation.model';
import { AuthService } from 'src/app/services';
import { Subject, catchError, map, takeUntil, tap } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ToastService } from 'src/app/shared/components/amos-toast';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  newMessage: string = '';
  currentConversation: Conversation[] = [];
  user: User | null = null;

  hour =   new Date().getHours()
  minutes = new Date().getMinutes()
  currentTime: string = "";
  unsubscribe$ = new Subject<void>();
  constructor(
    private http: HttpClient,
    private chatService: ChatService,
    private authService: AuthService,
    private toastService: ToastService) {
    this.currentTime = this.hour + ':' + this.minutes;
    this.chatService.newChat$.subscribe(create => {
      if(create) {
        this.calculateHeight()
      }
    })

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

  createEmbedding() {
    this.chatService.getEmbeddings()
  }

  send(text: string) {
    if(!this.user) {
      this.toastService.showWarning('Por favor debes iniciar sesión para poder utilizar nuestro chat.')
      return;
    }

    const userAsk: Conversation = {
      text: text,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
      role: 'user'
    }

    this.chatService.currentConversation.push(userAsk);
    this.currentConversation = this.chatService.currentConversation;
    this.newMessage = '';

    const body = {
      model: "text-embedding-ada-002",
      input: text,
      encoding_format: "float"
    };

    this.http.post<any>(this.chatService.url, body).subscribe(data => {
    this.chatService.newChat$.next(true);

    const answer: Conversation = {
            text: data,
            time: new Date().getHours() + ':' + new Date().getMinutes(),
            role: 'openia'
          }
    this.currentConversation.push(answer);
    this.chatService.newChat$.next(true);
    })
  }

  calculateHeight() {
    const div = document.getElementById('chat');

    if(div) {
      setTimeout(() => {
        div.scrollTop = (div.scrollHeight - div.clientHeight) + 60;
      }, 100)
    }
  }

}

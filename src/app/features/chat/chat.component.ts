import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Conversation, UserConveration } from './conversation.model';
import { AuthService } from 'src/app/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ToastService } from 'src/app/shared/components/amos-toast';
import { HttpClient } from '@angular/common/http';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { UserOtilia } from 'src/app/shared/user-Otilia.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

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

  conversations: UserConveration[] = [];
  userOtilia: UserOtilia | undefined = undefined;
  currentChatId: string = '';
  conversationName: string | undefined = undefined;
  private destroy$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private chatService: ChatService,
    private authService: AuthService,
    private toastService: ToastService,
    private firestore: Firestore,
    private usersService: UsersService,
    private route: ActivatedRoute
    ) {
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
        const sharedMessage = this.chatService.getData();
        if(sharedMessage !== '') {
          this.send(sharedMessage);
          this.chatService.clearData();
        }
      })
    )
  .subscribe();
  }

  ngOnDestroy() {
    this.chatService.clearData();
  }

  ngOnInit() {
    this.calculateHeight();
    const isSaved = this.chatService.chatFromSeved;

    if(isSaved) {
      this.currentConversation = isSaved.conversations;
      this.calculateHeight();
    }

    this.usersService.currentUserOtilia$.pipe(takeUntil(this.destroy$)).subscribe(userOtilia => {
      this.userOtilia = userOtilia;
    });
  }

  createEmbedding() {
    this.chatService.getEmbeddings()
  }

  send(text: string) {
    if(text === '') {
      return;
    }

    if(!this.user) {
      if(!this.user) {
        Swal.fire('Please log in to use our chat.')
        return;
      }
      return;
    }

    const userAsk: Conversation = {
      text: text,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
      role: 'user'
    }

    this.currentConversation.push(userAsk);
    this.calculateHeight();
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

  newChat() {
    this.currentConversation = [];
    this.currentChatId = '';
    this.chatService.chatFromSeved = null;
    location.reload();
  }

  saveChat() {
    if(!this.user || !this.user.email || !this.user.uid) {
      Swal.fire({
        title: "Please log in to save the chat",
        icon: "question"
      });

      return;
    }

    if(!this.currentConversation.length) {
      Swal.fire({
        title: "There are no chat to save",
        icon: "question"
      });
      return;
    }

    Swal.fire({
      title: "Do you want to save the chat?",
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: 'rgb(215, 137, 179)',
      cancelButtonColor: 'rgb(117, 97, 146)'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "If you want, you can give this conversation a name",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Save",
          confirmButtonColor: 'rgb(215, 137, 179)',
          cancelButtonColor: 'rgb(117, 97, 146)'
        }).then((result) => {
          if (result.isConfirmed) {
            this.conversationName = result.value;

            if(this.chatService.chatFromSeved) {
              this.userOtilia?.conversations.map(conversation => {
                if(conversation.chatId === this.chatService.chatFromSeved?.chatId) {
                  conversation.conversations = this.currentConversation;
                }
              });
            }

            if(this.userOtilia && !this.chatService.chatFromSeved) {
              const chat: UserConveration = {
                chatId: new Date().getTime().toString(),
                userUid: this.userOtilia.uid,
                email: this.userOtilia.email,
                conversations: this.currentConversation,
                conversationName: (this.conversationName && this.conversationName !== '') ? this.conversationName : 'Conversation' + ' ' + (this.userOtilia.conversations.length + 1).toString(),
              }

              this.currentChatId = chat.chatId;
              this.userOtilia?.conversations.push(chat);
            }

            const change = {
              conversations: this.userOtilia?.conversations
            }

            const createdUserDocRef = doc(this.firestore, `Users/${this.userOtilia?.id}`);

            updateDoc(createdUserDocRef, change).then(() => {
                // this.toastService.showSucess('Saved');
                Swal.fire('Saved');
                setTimeout(() => {
                  this.newChat();
                }, 500)
              })
              .catch((err) => {
                console.log(err)
                this.toastService.showWarning('Not saved', err);
            });

          }
        });
      } else if (result.isDenied) {
        return;
      }
    });
  }

}

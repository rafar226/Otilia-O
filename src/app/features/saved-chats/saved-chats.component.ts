import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { UserOtilia } from 'src/app/shared/user-Otilia.model';
import { UserConveration } from '../chat/conversation.model';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';
import Swal from 'sweetalert2'
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-saved-chats',
  templateUrl: './saved-chats.component.html',
  styleUrls: ['./saved-chats.component.scss']
})
export class SavedChatsComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<boolean>();
  userOtilia: UserOtilia | undefined = undefined;
  chats: UserConveration[] | undefined = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private chatService: ChatService,
    private firestore: Firestore,
    ) {}

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  ngOnInit() {
    this.usersService.currentUserOtilia$.pipe(takeUntil(this.destroy$)).subscribe(userOtilia => {
      this.userOtilia = userOtilia;
      this.chats = this.userOtilia?.conversations;
    });
  }

  goToChat(chat: UserConveration) {
    this.chatService.chatFromSeved = chat;
    this.router.navigate(
      ['/chat']
    );
  }

  removeChat(chat: UserConveration) {
    if(!this.userOtilia || !this.userOtilia.email || !this.userOtilia.uid) {
      Swal.fire({
        title: "Please log in to remove the chat",
        icon: "question"
      });

      return;
    }

    Swal.fire({
      title: "Do you want to remove the chat?",
      showCancelButton: true,
      confirmButtonText: "Remove",
      confirmButtonColor: 'rgb(215, 137, 179)',
      cancelButtonColor: 'rgb(117, 97, 146)'
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.userOtilia?.conversations) {
          const filteredChats = this.userOtilia?.conversations.filter(chats => chats.chatId !== chat.chatId);
          this.userOtilia.conversations = filteredChats;
        }

        const change = {
          conversations: this.userOtilia?.conversations
        }

        const createdUserDocRef = doc(this.firestore, `Users/${this.userOtilia?.id}`);

        updateDoc(createdUserDocRef, change).then(() => {
            // this.toastService.showSucess('Saved');
            Swal.fire('Saved');
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error')
        });

      }
    });
  }
}

import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Conversation } from './conversation.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  newMessage: string = '';
  currentConversation: Conversation[] = [];

  hour =   new Date().getHours()
  minutes = new Date().getMinutes()
  currentTime: string = "";

  constructor(private chatService: ChatService) {
    this.currentTime = this.hour + ':' + this.minutes;
    this.chatService.newChat$.subscribe(create => {
      if(create) {
        this.calculateHeight()
      }
    })
  }

  send(text: string) {
    const userAsk: Conversation = {
      text: text,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
      role: 'user'
    }

    this.chatService.currentConversation.push(userAsk);
    this.currentConversation = this.chatService.currentConversation;
    this.newMessage = '';

    this.chatService.newChat$.next(true);
    this.chatService.getDataFromOpenAi(text);
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

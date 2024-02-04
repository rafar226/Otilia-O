import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  hour =   new Date().getHours()
  minutes = new Date().getMinutes()
  currentTime: string = "";

  constructor() {
    this.currentTime = this.hour + ':' + this.minutes;
  }

}

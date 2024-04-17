import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ChatRoutingModule],
  declarations: [ChatComponent],
})
export class ChatModule {}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavedChatsRoutingModule } from './saved-chat-routing.module';
import { SavedChatsComponent } from './saved-chats.component';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SavedChatsRoutingModule],
  declarations: [SavedChatsComponent],
})
export class SavedChatModule {}

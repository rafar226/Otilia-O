import { User } from "@angular/fire/auth";

export interface Conversation {
  text: string;
  time: string;
  role: string;
}

export interface UserConveration {
  chatId: string;
  userUid: string;
  email: string;
  conversations: Conversation[];
  conversationName: string;
}

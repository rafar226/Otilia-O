import { Conversation, UserConveration } from "../features/chat/conversation.model"

export interface UserOtilia {
  id?: string,
  uid: string,
  email: string,
  name: string,
  lastName: string,
  nickName: string,
  profileImg: string,
  nationality: string,
  isEmailValid: boolean,
  conversations: UserConveration[]
}

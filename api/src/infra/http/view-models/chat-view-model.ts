import { Chat } from '@app/entities/chat/chat';
import { HttpUserViewModel, UserViewModel } from './user-view-model';

export interface HttpChatViewModel {
  id: string;
  users: HttpUserViewModel[];
  startedAt: Date | null | undefined;
}

export class ChatViewModel {
  static toHTTP(chat: Chat): HttpChatViewModel {
    return {
      id: chat.id,
      users: chat.users.map(UserViewModel.toHTTP),
      startedAt: chat.startedAt,
    };
  }

  static orderUsers(chat: Chat, authUserId: string): Chat {
    const firstUser = chat.users[0];
    const secondeUser = chat.users[1];

    if (firstUser.id === authUserId) {
      chat.users = [firstUser, secondeUser];
    } else {
      chat.users = [secondeUser, firstUser];
    }

    return chat;
  }
}

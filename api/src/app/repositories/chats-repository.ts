import { Chat } from '@app/entities/chat/chat';

export abstract class ChatsRepository {
  abstract findById(id: string): Promise<Chat | null>;
  abstract findByUsers(users: string[]): Promise<Chat | null>;
  abstract listStartedChatsByUserId(userId: string): Promise<Chat[]>;
  abstract listChatRequestsByUserId(userId: string): Promise<Chat[]>;
  abstract create(chat: Chat): Promise<Chat>;
  abstract save(chat: Chat): Promise<Chat>;
}

import { Chat } from '@app/entities/chat/chat';
import { ChatsRepository } from '@app/repositories/chats-repository';

export class InMemoryChatsRepository implements ChatsRepository {
  public chats: Chat[] = [];

  async findById(id: string): Promise<Chat | null> {
    return this.chats.find((item) => item.id === id) ?? null;
  }

  async findByUsers(users: string[]): Promise<Chat | null> {
    return (
      this.chats.find(
        (item) =>
          item.users.some((value) => value.id === users[0]) &&
          item.users.some((value) => value.id === users[1]),
      ) ?? null
    );
  }

  async listStartedChatsByUserId(userId: string): Promise<Chat[]> {
    return this.chats.filter(
      (item) =>
        item.startedAt && item.users.some((value) => value.id === userId),
    );
  }

  async listChatRequestsByUserId(userId: string): Promise<Chat[]> {
    return this.chats.filter(
      (item) =>
        !item.startedAt && item.users.some((value) => value.id === userId),
    );
  }

  async create(chat: Chat): Promise<Chat> {
    this.chats.push(chat);

    return chat;
  }

  async save(data: Chat): Promise<Chat> {
    let chat = this.chats.find((item) => item.id === data.id);

    if (!chat) throw new Error();

    chat = data;

    return chat;
  }
}

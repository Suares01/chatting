import { Message } from '@app/entities/message/message';
import {
  FindByChatId,
  MessagesRepository,
  ReadMessages,
} from '@app/repositories/messages-repository';

export class InMemoryMessagesRepository implements MessagesRepository {
  public messages: Message[] = [];

  async listByChatId(data: FindByChatId): Promise<Message[]> {
    const { chatId, skip, take } = data;

    return this.messages
      .filter((item) => item.chatId === chatId)
      .slice(skip, skip + take);
  }

  async findByMessageId(messageId: string): Promise<Message | null> {
    const message = this.messages.find((item) => item.id === messageId);

    return message ?? null;
  }

  async countMessagesByChatId(chatId: string): Promise<number> {
    return this.messages.filter((item) => item.chatId === chatId).length;
  }

  async create(messgae: Message): Promise<Message> {
    this.messages.push(messgae);

    return messgae;
  }

  async readMessages(data: ReadMessages): Promise<void> {
    const { chatId, senderId } = data;

    this.messages.forEach((item) => {
      if (item.chatId === chatId && senderId === senderId && !item.readAt)
        item.read();
    });
  }
}

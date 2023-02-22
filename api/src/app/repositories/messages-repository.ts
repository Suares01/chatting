import { Message } from '@app/entities/message/message';

export interface FindByChatId {
  chatId: string;
  take: number;
  skip: number;
}

export interface ReadMessages {
  senderId: string;
  chatId: string;
}

export abstract class MessagesRepository {
  abstract listByChatId(data: FindByChatId): Promise<Message[]>;
  abstract countMessagesByChatId(chatId: string): Promise<number>;
  abstract findByMessageId(messageId: string): Promise<Message | null>;
  abstract create(messgae: Message): Promise<Message>;
  abstract readMessages(data: ReadMessages): Promise<void>;
}

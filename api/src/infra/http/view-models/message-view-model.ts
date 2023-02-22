import { Message } from '@app/entities/message/message';

export interface HttpMessageViewModel {
  id: string;
  chatId: string;
  receiverId: string;
  senderId: string;
  content: string;
  readAt?: Date | null;
  sentAt: Date;
}

export class MessageViewModel {
  static toHTTP(message: Message): HttpMessageViewModel {
    return {
      id: message.id,
      senderId: message.senderId,
      content: message.content,
      receiverId: message.receiverId,
      chatId: message.chatId,
      readAt: message.readAt,
      sentAt: message.sentAt,
    };
  }
}

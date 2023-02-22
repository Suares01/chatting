import { Message } from '@app/entities/message/message';

export interface WSMessage {
  id: string;
  chatId: string;
  receiverId: string;
  senderId: string;
  content: string;
  sentAt: Date;
}

export class MessageViewModel {
  static toWS(message: Message): WSMessage {
    return {
      id: message.id,
      content: message.content,
      chatId: message.chatId,
      receiverId: message.receiverId,
      senderId: message.senderId,
      sentAt: message.sentAt,
    };
  }
}

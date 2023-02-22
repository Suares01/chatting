import { Message } from '@app/entities/message/message';
import { Message as PrismaMessage } from '@prisma/client';

export class PrismaMessageMapper {
  static toPrisma(message: Message): PrismaMessage {
    return {
      id: message.id,
      content: message.content,
      receiverId: message.receiverId,
      senderId: message.senderId,
      chatId: message.chatId,
      readAt: message.readAt as Date | null,
      sentAt: message.sentAt,
    };
  }

  static toDomain(message: PrismaMessage): Message {
    return new Message(
      {
        chatId: message.chatId,
        content: message.content,
        receiverId: message.receiverId,
        senderId: message.senderId,
        readAt: message.readAt,
        sentAt: message.sentAt,
      },
      message.id,
    );
  }
}

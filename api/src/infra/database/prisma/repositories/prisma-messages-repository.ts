import { Message } from '@app/entities/message/message';
import {
  FindByChatId,
  MessagesRepository,
  ReadMessages,
} from '@app/repositories/messages-repository';
import { Injectable } from '@nestjs/common';
import { PrismaMessageMapper } from '../mappers/prisma-message-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMessagesRepository implements MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async listByChatId(data: FindByChatId): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: data.chatId,
      },
      skip: data.skip,
      take: data.take,
      orderBy: {
        sentAt: 'desc',
      },
    });

    return messages.map(PrismaMessageMapper.toDomain);
  }

  async findByMessageId(messageId: string): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    return message ? PrismaMessageMapper.toDomain(message) : null;
  }

  async countMessagesByChatId(chatId: string): Promise<number> {
    const count = await this.prisma.message.count({
      where: {
        chatId,
      },
    });

    return count;
  }

  async create(messgae: Message): Promise<Message> {
    const data = PrismaMessageMapper.toPrisma(messgae);

    const createdMessage = await this.prisma.message.create({
      data,
    });

    return PrismaMessageMapper.toDomain(createdMessage);
  }

  async readMessages(data: ReadMessages): Promise<void> {
    const { senderId, chatId } = data;

    await this.prisma.message.updateMany({
      where: {
        senderId,
        chatId,
        readAt: {
          isSet: false,
        },
      },
      data: {
        readAt: new Date(),
      },
    });
  }
}

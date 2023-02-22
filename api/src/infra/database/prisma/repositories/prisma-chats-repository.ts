import { Chat } from '@app/entities/chat/chat';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { PrismaService } from '../prisma.service';
import { PrismaChatMapper } from '../mappers/prisma-chat-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaChatsRepository implements ChatsRepository {
  constructor(private prisma: PrismaService) {}

  private select = {
    id: true,
    users: true,
    startedAt: true,
  };

  async findById(id: string): Promise<Chat | null> {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id,
      },
      select: this.select,
    });

    return chat ? PrismaChatMapper.toDomain(chat) : null;
  }

  async findByUsers(users: string[]): Promise<Chat | null> {
    const chat = await this.prisma.chat.findUnique({
      where: {
        userIds: users,
      },
      select: this.select,
    });

    return chat ? PrismaChatMapper.toDomain(chat) : null;
  }

  async listStartedChatsByUserId(userId: string): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      where: {
        userIds: {
          has: userId,
        },
        startedAt: {
          not: null,
        },
      },
      select: this.select,
    });

    return chats.map(PrismaChatMapper.toDomain);
  }

  async listChatRequestsByUserId(userId: string): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      where: {
        startedAt: {
          isSet: false,
        },
        userIds: {
          has: userId,
        },
      },
      select: this.select,
    });

    return chats.map(PrismaChatMapper.toDomain);
  }

  async create(data: Chat): Promise<Chat> {
    const prismaChat = PrismaChatMapper.toPrisma(data);

    const createdChat = await this.prisma.chat.create({
      data: prismaChat,
      select: this.select,
    });

    return PrismaChatMapper.toDomain(createdChat);
  }

  async save(chat: Chat): Promise<Chat> {
    const { id, ...data } = PrismaChatMapper.toPrisma(chat);

    const updatedChat = await this.prisma.chat.update({
      where: {
        id,
      },
      data,
      select: this.select,
    });

    return PrismaChatMapper.toDomain(updatedChat);
  }
}

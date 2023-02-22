import { Chat } from '@app/entities/chat/chat';
import { Chat as PrismaChat, User as PrismaUser } from '@prisma/client';
import { PrismaUserMapper } from './prisma-user-mapper';

interface ChatWithUsersData {
  id: string;
  users: PrismaUser[];
  startedAt: Date | null;
}

export class PrismaChatMapper {
  static toPrisma(chat: Chat): PrismaChat {
    return {
      id: chat.id,
      userIds: chat.users.map((user) => user.id),
      startedAt: chat.startedAt as Date | null,
    };
  }

  static toDomain(chat: ChatWithUsersData): Chat {
    return new Chat(
      {
        users: chat.users.map(PrismaUserMapper.toDomain),
        startedAt: chat.startedAt,
      },
      chat.id,
    );
  }
}

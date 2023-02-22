import { ChatsRepository } from '@app/repositories/chats-repository';
import { MessagesRepository } from '@app/repositories/messages-repository';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaChatsRepository } from './prisma/repositories/prisma-chats-repository';
import { PrismaMessagesRepository } from './prisma/repositories/prisma-messages-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ChatsRepository,
      useClass: PrismaChatsRepository,
    },
    {
      provide: MessagesRepository,
      useClass: PrismaMessagesRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    UsersRepository,
    ChatsRepository,
    MessagesRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}

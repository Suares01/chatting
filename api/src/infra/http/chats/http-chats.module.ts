import { ListUserChatRequests } from '@app/use-cases/chat/list-user-chat-requests';
import { ListUserStartedChats } from '@app/use-cases/chat/list-user-started-chats';
import { SendChatRequest } from '@app/use-cases/chat/send-chat-request';
import { StartChat } from '@app/use-cases/chat/start-chat';
import { DatabaseModule } from '@infra/database/database.module';
import { EventsModule } from '@infra/events/events.module';
import { Module } from '@nestjs/common';
import { ChatsController } from './controllers/chats.controller';

@Module({
  imports: [DatabaseModule, EventsModule],
  controllers: [ChatsController],
  providers: [
    StartChat,
    ListUserChatRequests,
    ListUserStartedChats,
    SendChatRequest,
  ],
})
export class HttpChatsModule {}

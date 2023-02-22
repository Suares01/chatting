import { ListInitialMessages } from '@app/use-cases/message/list-initial-messages';
import { ListMessagesByChat } from '@app/use-cases/message/list-messages-by-chat';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [ListMessagesByChat, ListInitialMessages],
})
export class HttpMessagesModule {}

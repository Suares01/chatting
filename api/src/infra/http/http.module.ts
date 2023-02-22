import { Module } from '@nestjs/common';
import { HttpAuthenticationModule } from './authentication/http-authentication.module';
import { HttpChatsModule } from './chats/http-chats.module';
import { HttpMessagesModule } from './messages/http-messages.module';
import { HttpNotificationsModule } from './notifications/http-notifications.module';
import { HttpUsersModule } from './users/http-users.module';

@Module({
  imports: [
    HttpUsersModule,
    HttpAuthenticationModule,
    HttpChatsModule,
    HttpMessagesModule,
    HttpNotificationsModule,
  ],
})
export class HttpModule {}

import { SendMessage } from '@app/use-cases/message/send-message';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtModule } from '@infra/jwt/jwt.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendMessageConsumer } from './jobs/consumers/send-message.consumer';
import { SendMessageProucer } from './jobs/producers/send-message.producer';
import { MessagesGateway } from './socket-io/gateways/messages.gateway';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
    BullModule.forRoot({
      url: process.env.CACHE_URL,
    }),
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  providers: [
    SendMessage,
    MessagesGateway,
    SendMessageProucer,
    SendMessageConsumer,
  ],
})
export class WebSocketModule {}

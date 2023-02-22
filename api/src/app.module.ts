import { EventsModule } from '@infra/events/events.module';
import { JwtAuthGuard } from '@infra/http/authentication/guards/jwt-auth.guard';
import { HttpModule } from '@infra/http/http.module';
import { WebSocketModule } from '@infra/web-socket/web-socket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';

@Module({
  imports: [
    HttpModule,
    WebSocketModule,
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

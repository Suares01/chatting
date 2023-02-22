import { NotificationsEvents } from '@app/events/notifications-events';
import { SendNotification } from '@app/use-cases/notification/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NestEmitterNotificationsEvents } from './notifications.events';

@Module({
  imports: [EventEmitterModule.forRoot(), DatabaseModule],
  providers: [
    SendNotification,
    {
      provide: NotificationsEvents,
      useClass: NestEmitterNotificationsEvents,
    },
  ],
  exports: [NotificationsEvents],
})
export class EventsModule {}

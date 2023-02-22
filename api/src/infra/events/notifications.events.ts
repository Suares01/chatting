import {
  NotificationInfo,
  NotificationsEvents,
} from '@app/events/notifications-events';
import { SendNotification } from '@app/use-cases/notification/send-notification';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NestEmitterNotificationsEvents implements NotificationsEvents {
  constructor(
    private eventEmitter: EventEmitter2,
    private sendNotification: SendNotification,
  ) {}

  @OnEvent('sendNotification')
  protected async handleSendNotification(
    event: NotificationInfo,
  ): Promise<void> {
    await this.sendNotification.execute(event);
  }

  public async emitNotification(notification: NotificationInfo) {
    await this.eventEmitter.emitAsync('sendNotification', notification);
  }
}

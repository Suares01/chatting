import { Notification } from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/value-objects/content';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  recipientId: string;
  content: string;
  category: string;
}

interface Response {
  notification: Notification;
}

@Injectable()
export class SendNotification implements UseCase<Request, Response> {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}

import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  recipientId: string;
}

interface Response {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications implements UseCase<Request, Response> {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications: notifications.filter(
        (notification) => !notification.canceledAt,
      ),
    };
  }
}

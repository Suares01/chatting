import { NotFoundError } from '@app/errors/not-found';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  notificationId: string;
}

type Response = void;

@Injectable()
export class UnreadNotification implements UseCase<Request, Response> {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotFoundError('notification not found');

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}

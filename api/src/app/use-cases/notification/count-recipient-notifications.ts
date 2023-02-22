import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  recipientId: string;
}

interface Response {
  count: number;
}

@Injectable()
export class CountRecipientNotifications implements UseCase<Request, Response> {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}

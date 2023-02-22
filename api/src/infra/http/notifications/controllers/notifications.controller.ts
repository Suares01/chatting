import { CancelNotification } from '@app/use-cases/notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/notification/read-notification';
import { UnreadNotification } from '@app/use-cases/notification/unread-notification';
import { CurrentUser } from '@infra/http/authentication/decorators/current-user.decorator';
import { UserFromJwtDto } from '@infra/http/authentication/dtos/user-from-jwt.dto';
import {
  HttpNotificationViewModel,
  NotificationViewModel,
} from '@infra/http/view-models/notification-view-model';
import { Controller, Get, Param, Patch } from '@nestjs/common';

interface NotificationsListResponse {
  notifications: HttpNotificationViewModel[];
}

interface NotificationsCountResponse {
  count: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Get()
  async getFromRecipient(
    @CurrentUser() user: UserFromJwtDto,
  ): Promise<NotificationsListResponse> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: user.id,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Get('count')
  async countFromRecipient(
    @CurrentUser() user: UserFromJwtDto,
  ): Promise<NotificationsCountResponse> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: user.id,
    });

    return { count };
  }

  @Patch('cancel/:notificationId')
  async cancel(@Param('notificationId') notificationId: string): Promise<void> {
    await this.cancelNotification.execute({ notificationId });
  }

  @Patch('read/:notificationId')
  async read(@Param('notificationId') notificationId: string): Promise<void> {
    await this.readNotification.execute({ notificationId });
  }

  @Patch('unread/:notificationId')
  async unread(@Param('notificationId') notificationId: string): Promise<void> {
    await this.unreadNotification.execute({ notificationId });
  }
}

import { CancelNotification } from '@app/use-cases/notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/notification/read-notification';
import { UnreadNotification } from '@app/use-cases/notification/unread-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpNotificationsModule {}

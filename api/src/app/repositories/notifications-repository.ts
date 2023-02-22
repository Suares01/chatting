import { Notification } from '@app/entities/notification/notification';

export abstract class NotificationsRepository {
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}

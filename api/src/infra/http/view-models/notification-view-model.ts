import { Notification } from '@app/entities/notification/notification';

export interface HttpNotificationViewModel {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt: Date | null | undefined;
  createdAt: Date;
}

export class NotificationViewModel {
  static toHTTP(notification: Notification): HttpNotificationViewModel {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}

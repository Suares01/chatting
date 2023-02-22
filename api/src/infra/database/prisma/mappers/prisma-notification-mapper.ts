import { Notification } from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/value-objects/content';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt as Date | null,
      canceledAt: notification.canceledAt as Date | null,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(notification: PrismaNotification): Notification {
    return new Notification(
      {
        recipientId: notification.recipientId,
        category: notification.category,
        content: new Content(notification.content),
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }
}

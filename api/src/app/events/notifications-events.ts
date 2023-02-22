export interface NotificationInfo {
  category: string;
  recipientId: string;
  content: string;
}

export abstract class NotificationsEvents {
  abstract emitNotification(notification: NotificationInfo): Promise<void>;
}

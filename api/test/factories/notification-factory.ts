import {
  Notification,
  NotificationProps,
} from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/value-objects/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('Wow! Notification!'),
    recipientId: 'recipient-id',
    ...override,
  });
}

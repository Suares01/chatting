import { Notification, NotificationProps } from './notification';
import { Content } from './value-objects/content';

describe('Notification', () => {
  it('should be able to create a notification ', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'Social',
      recipientId: 'example',
    });

    expect(notification).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        props: expect.objectContaining<NotificationProps>({
          category: 'Social',
          content: expect.any(Content),
          recipientId: 'example',
          createdAt: expect.any(Date),
        }),
      }),
    );
  });
});

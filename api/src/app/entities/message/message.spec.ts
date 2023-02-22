import { Message, MessageProps } from './message';
import * as crypto from 'node:crypto';

describe('Message', () => {
  it('should be able to create a message', () => {
    const message = new Message({
      chatId: crypto.randomUUID(),
      receiverId: crypto.randomUUID(),
      content: 'send a message',
      senderId: crypto.randomUUID(),
    });

    expect(message).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        props: expect.objectContaining<MessageProps>({
          chatId: expect.any(String),
          receiverId: expect.any(String),
          content: 'send a message',
          senderId: expect.any(String),
          sentAt: expect.any(Date),
        }),
      }),
    );
  });
});

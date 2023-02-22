import { Message, MessageProps } from '@app/entities/message/message';

type Override = Partial<MessageProps>;

export function makeMessage(override: Override = {}): Message {
  return new Message({
    content: "i'm sending a message",
    receiverId: 'receiverId',
    chatId: 'chatId',
    senderId: 'senderId',
    ...override,
  });
}

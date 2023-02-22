import { Chat, ChatProps } from '@app/entities/chat/chat';

type Override = Partial<ChatProps>;

export function makeChat(override: Override = {}): Chat {
  return new Chat({
    users: [],
    ...override,
  });
}

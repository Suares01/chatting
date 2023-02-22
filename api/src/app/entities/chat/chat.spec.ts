import { Chat, ChatProps } from './chat';
import { makeUser } from '@test/factories/user-factory';
import { User } from '../user/user';

describe('Chat', () => {
  it('should be able to create a chat', () => {
    const chat = new Chat({
      users: [makeUser(), makeUser()],
    });

    expect(chat).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        props: expect.objectContaining<ChatProps>({
          users: expect.arrayContaining([expect.any(User), expect.any(User)]),
        }),
      }),
    );
  });
});

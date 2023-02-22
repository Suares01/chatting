import { makeChat } from '@test/factories/chat-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { ListUserStartedChats } from './list-user-started-chats';

describe('List user started chats', () => {
  it('should be able to list the user started chats', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const listUserStartedChats = new ListUserStartedChats(chatsRepository);

    const user = makeUser();
    const chatRequest = makeChat({ users: [user] });
    const startedChat = makeChat({ users: [user], startedAt: new Date() });
    chatsRepository.chats.push(chatRequest, startedChat);

    const { chats } = await listUserStartedChats.execute({ userId: user.id });

    expect(chats).toEqual([startedChat]);
  });
});

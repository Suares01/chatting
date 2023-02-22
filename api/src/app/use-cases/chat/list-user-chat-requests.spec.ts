import { makeChat } from '@test/factories/chat-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { ListUserChatRequests } from './list-user-chat-requests';

describe('List user chat requests', () => {
  it('should be able to lists the user chat requests', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const listUserChatRequests = new ListUserChatRequests(chatsRepository);

    const user = makeUser();
    const chatRequest = makeChat({ users: [user] });
    const startedChat = makeChat({ startedAt: new Date(), users: [user] });
    chatsRepository.chats.push(chatRequest, startedChat);

    const { chatRequests } = await listUserChatRequests.execute({
      userId: user.id,
    });

    expect(chatRequests).toEqual([chatRequest]);
  });
});

import { makeChat } from '@test/factories/chat-factory';
import { makeMessage } from '@test/factories/message-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { InMemoryMessagesRepository } from '@test/repositories/in-memory-messages-repository';
import { ListInitialMessages } from './list-initial-messages';

describe('List initial messages', () => {
  it('should list the initial messages of all user chats', async () => {
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const listInitialMessages = new ListInitialMessages(
      chatsRepository,
      messagesRepository,
    );

    const user = makeUser();
    const chat = makeChat({ users: [user], startedAt: new Date() });
    const message = makeMessage({ chatId: chat.id, senderId: user.id });

    chatsRepository.chats.push(chat);
    messagesRepository.messages = Array(10).fill(message);

    const { messages } = await listInitialMessages.execute({
      userId: user.id,
      skip: 0,
      take: 5,
    });

    expect(messages).toEqual(
      expect.arrayContaining([
        {
          chatId: chat.id,
          messages: expect.arrayContaining(Array(6).fill(message)),
          count: 10,
        },
      ]),
    );
  });
});

import { makeChat } from '@test/factories/chat-factory';
import { makeMessage } from '@test/factories/message-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryMessagesRepository } from '@test/repositories/in-memory-messages-repository';
import { ReadMessage } from './read-message';

describe('Read message', () => {
  it('should be able read a message', async () => {
    const messagesRepository = new InMemoryMessagesRepository();
    const readMessage = new ReadMessage(messagesRepository);

    const chat = makeChat();
    const sender = makeUser();
    const unreadMessage = makeMessage({ chatId: chat.id, senderId: sender.id });

    messagesRepository.messages = Array(5).fill(unreadMessage);

    await readMessage.execute({ chatId: chat.id, senderId: sender.id });

    expect(messagesRepository.messages[0].readAt).toEqual(expect.any(Date));
  });
});

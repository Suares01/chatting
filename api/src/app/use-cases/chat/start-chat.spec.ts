import { NotFoundError } from '@app/errors/not-found';
import { makeChat } from '@test/factories/chat-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { StartChat } from './start-chat';

describe('Start chat', () => {
  it('should be able to start a chat', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const startChat = new StartChat(chatsRepository);

    const chat = makeChat();
    chatsRepository.chats.push(chat);

    await startChat.execute({
      chatId: chat.id,
    });

    expect(chatsRepository.chats[0].startedAt).toEqual(expect.any(Date));
  });

  it('should not be able to start a chat if the chat does not exist', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const startChat = new StartChat(chatsRepository);

    await expect(
      startChat.execute({
        chatId: 'some-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });
});

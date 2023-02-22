import { NotFoundError } from '@app/errors/not-found';
import { makeChat } from '@test/factories/chat-factory';
import { makeMessage } from '@test/factories/message-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { InMemoryMessagesRepository } from '@test/repositories/in-memory-messages-repository';
import { ListMessagesByChat } from './list-messages-by-chat';

describe('List messages by chat id', () => {
  it('should be able to return messages by chat id', async () => {
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const listMessagesByChat = new ListMessagesByChat(
      messagesRepository,
      chatsRepository,
    );

    const chat = makeChat();

    chatsRepository.chats.push(chat);
    messagesRepository.messages.push(
      makeMessage({ chatId: chat.id }),
      makeMessage({ chatId: chat.id }),
      makeMessage(),
    );

    const { messages } = await listMessagesByChat.execute({
      chatId: chat.id,
      skip: 0,
      take: 4,
    });

    expect(messages).toHaveLength(2);
  });

  it('should not be able to return messages by chat id if the chat does not exist', async () => {
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const listMessagesByChat = new ListMessagesByChat(
      messagesRepository,
      chatsRepository,
    );

    await expect(
      listMessagesByChat.execute({
        chatId: 'some-id',
        skip: 0,
        take: 4,
      }),
    ).rejects.toThrow(NotFoundError);
  });
});

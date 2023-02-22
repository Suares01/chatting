import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { makeChat } from '@test/factories/chat-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { InMemoryMessagesRepository } from '@test/repositories/in-memory-messages-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { SendMessage } from './send-message';

describe('Send message', () => {
  it('should be able to send a message', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const sendMessage = new SendMessage(
      messagesRepository,
      usersRepository,
      chatsRepository,
    );

    const chat = makeChat({ startedAt: new Date() });
    const sender = makeUser();
    const receiver = makeUser();

    usersRepository.users.push(sender, receiver);
    chatsRepository.chats.push(chat);

    await sendMessage.execute({
      id: 'message-id',
      senderId: sender.id,
      chatId: chat.id,
      receiverId: receiver.id,
      content: 'hi receiver',
      sentAt: new Date(),
    });

    expect(messagesRepository.messages[0]).toEqual(
      expect.objectContaining({
        senderId: sender.id,
        receiverId: receiver.id,
        chatId: chat.id,
        content: 'hi receiver',
      }),
    );
  });

  it('should not be able to send a message if the chat does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const sendMessage = new SendMessage(
      messagesRepository,
      usersRepository,
      chatsRepository,
    );

    const sender = makeUser();
    const receiver = makeUser();

    usersRepository.users.push(sender);
    usersRepository.users.push(receiver);

    await expect(
      sendMessage.execute({
        id: 'message-id',
        senderId: sender.id,
        chatId: 'chat-id',
        receiverId: receiver.id,
        content: 'hi receiver',
        sentAt: new Date(),
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to send a message if the chat has not been started', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const sendMessage = new SendMessage(
      messagesRepository,
      usersRepository,
      chatsRepository,
    );

    const chat = makeChat();
    const sender = makeUser();
    const receiver = makeUser();

    chatsRepository.chats.push(chat);
    usersRepository.users.push(sender);
    usersRepository.users.push(receiver);

    await expect(
      sendMessage.execute({
        id: 'message-id',
        senderId: sender.id,
        chatId: chat.id,
        receiverId: receiver.id,
        content: 'hi receiver',
        sentAt: new Date(),
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to send a message if the receiver does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const sendMessage = new SendMessage(
      messagesRepository,
      usersRepository,
      chatsRepository,
    );

    const sender = makeUser();
    const chat = makeChat({ startedAt: new Date() });

    usersRepository.users.push(sender);
    chatsRepository.chats.push(chat);

    await expect(
      sendMessage.execute({
        id: 'message-id',
        senderId: sender.id,
        chatId: chat.id,
        receiverId: 'receiver-id',
        content: 'hi receiver',
        sentAt: new Date(),
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to send a message if the sender does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const messagesRepository = new InMemoryMessagesRepository();
    const chatsRepository = new InMemoryChatsRepository();
    const sendMessage = new SendMessage(
      messagesRepository,
      usersRepository,
      chatsRepository,
    );

    const receiver = makeUser();
    const chat = makeChat({ startedAt: new Date() });

    usersRepository.users.push(receiver);
    chatsRepository.chats.push(chat);

    await expect(
      sendMessage.execute({
        id: 'message-id',
        senderId: 'sender-id',
        chatId: chat.id,
        receiverId: receiver.id,
        content: 'hi receiver',
        sentAt: new Date(),
      }),
    ).rejects.toThrow(NotFoundError);
  });
});

import { ChatProps } from '@app/entities/chat/chat';
import { ConflictError } from '@app/errors/conflict';
import { NotFoundError } from '@app/errors/not-found';
import { NotificationsEvents } from '@app/events/notifications-events';
import { makeChat } from '@test/factories/chat-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryChatsRepository } from '@test/repositories/in-memory-chats-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { SendChatRequest } from './send-chat-request';

describe('Chat request', () => {
  const notificationsEvents: NotificationsEvents = {
    emitNotification: jest.fn(),
  };

  it('should be able to request a chat', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const chatRequest = new SendChatRequest(
      chatsRepository,
      usersRepository,
      notificationsEvents,
    );

    const chatRequestSender = makeUser();
    const chatRequestReceiver = makeUser();

    usersRepository.users.push(chatRequestReceiver, chatRequestSender);

    await chatRequest.execute({
      requestReceiver: chatRequestReceiver.id,
      requestSender: chatRequestSender.id,
    });

    expect(chatsRepository.chats[0]).toEqual(
      expect.objectContaining<ChatProps>({
        users: expect.arrayContaining([chatRequestReceiver, chatRequestSender]),
      }),
    );
    expect(notificationsEvents.emitNotification).toHaveBeenCalled();
  });

  it('should not be able to request a chat if the receiver does not exist', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const chatRequest = new SendChatRequest(
      chatsRepository,
      usersRepository,
      notificationsEvents,
    );

    const chatRequestSender = makeUser();

    usersRepository.users.push(chatRequestSender);

    await expect(
      chatRequest.execute({
        requestReceiver: 'receiver-id',
        requestSender: chatRequestSender.id,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to request a chat if the sender does not exist', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const chatRequest = new SendChatRequest(
      chatsRepository,
      usersRepository,
      notificationsEvents,
    );

    const chatRequestReceiver = makeUser();

    usersRepository.users.push(chatRequestReceiver);

    await expect(
      chatRequest.execute({
        requestReceiver: chatRequestReceiver.id,
        requestSender: 'sender-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to request a chat if the users already have a chat', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const chatRequest = new SendChatRequest(
      chatsRepository,
      usersRepository,
      notificationsEvents,
    );

    const chatRequestSender = makeUser();
    const chatRequestReceiver = makeUser();

    chatsRepository.chats.push(
      makeChat({ users: [chatRequestSender, chatRequestReceiver] }),
    );
    usersRepository.users.push(chatRequestReceiver, chatRequestSender);

    await expect(
      chatRequest.execute({
        requestReceiver: chatRequestReceiver.id,
        requestSender: chatRequestSender.id,
      }),
    ).rejects.toThrow(ConflictError);
  });

  it('should not be able to start a chat if the sender and receiver are the same user', async () => {
    const chatsRepository = new InMemoryChatsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const chatRequest = new SendChatRequest(
      chatsRepository,
      usersRepository,
      notificationsEvents,
    );

    const chatRequestSender = makeUser();

    chatsRepository.chats.push(
      makeChat({ users: [chatRequestSender, chatRequestSender] }),
    );
    usersRepository.users.push(chatRequestSender, chatRequestSender);

    await expect(
      chatRequest.execute({
        requestReceiver: chatRequestSender.id,
        requestSender: chatRequestSender.id,
      }),
    ).rejects.toThrow(ConflictError);
  });
});

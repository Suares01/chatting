import { ConflictError } from '@app/errors/conflict';
import { NotFoundError } from '@app/errors/not-found';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { UseCase } from '../use-case';
import { Chat } from '@app/entities/chat/chat';
import { Injectable } from '@nestjs/common';
import { NotificationsEvents } from '@app/events/notifications-events';

interface Request {
  requestSender: string;
  requestReceiver: string;
}

type Response = void;

@Injectable()
export class SendChatRequest implements UseCase<Request, Response> {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly notificationsEvents: NotificationsEvents,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { requestReceiver, requestSender } = request;

    const receiver = await this.usersRepository.findById(requestReceiver);

    if (!receiver) throw new NotFoundError('chat request receiver not found');

    const sender = await this.usersRepository.findById(requestSender);

    if (!sender) throw new NotFoundError('chat request sender not found');

    if (sender.id === receiver.id)
      throw new ConflictError('you cannot start a chat with yourself');

    const chatAlreadyExists = await this.chatsRepository.findByUsers([
      receiver.id,
      sender.id,
    ]);

    if (chatAlreadyExists)
      throw new ConflictError('these users already have a chat');

    const chat = new Chat({ users: [receiver, sender] });

    sender.chats.push(chat.id);
    receiver.chats.push(chat.id);

    await this.chatsRepository.create(chat);
    await Promise.allSettled([
      this.usersRepository.save(sender),
      this.usersRepository.save(receiver),
    ]);

    await this.notificationsEvents.emitNotification({
      category: 'Social',
      recipientId: requestReceiver,
      content: `${sender.username.value} wants to start a chat with you.`,
    });
  }
}

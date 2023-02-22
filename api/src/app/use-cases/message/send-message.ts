import { Message } from '@app/entities/message/message';
import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { MessagesRepository } from '@app/repositories/messages-repository';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  id: string;
  chatId: string;
  receiverId: string;
  senderId: string;
  content: string;
  sentAt: Date;
}

type Response = void;

@Injectable()
export class SendMessage implements UseCase<Request, Response> {
  constructor(
    private readonly messageRepository: MessagesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { content, chatId, senderId, receiverId, id, sentAt } = request;

    const chat = await this.chatsRepository.findById(chatId);

    if (!chat) throw new NotFoundError('this chat does not exist');

    if (!chat.startedAt) throw new BadRequestError('chat has not been started');

    const receiver = await this.usersRepository.findById(receiverId);

    if (!receiver) throw new NotFoundError('this chat does not exist');

    const sender = await this.usersRepository.findById(senderId);

    if (!sender) throw new NotFoundError('sender does not exist');

    const message = new Message(
      {
        content,
        chatId,
        receiverId,
        senderId,
        sentAt,
      },
      id,
    );

    await this.messageRepository.create(message);
  }
}

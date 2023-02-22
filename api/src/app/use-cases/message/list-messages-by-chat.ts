import { Message } from '@app/entities/message/message';
import { NotFoundError } from '@app/errors/not-found';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { MessagesRepository } from '@app/repositories/messages-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  chatId: string;
  take: number;
  skip: number;
}

interface Response {
  messages: Message[];
}

@Injectable()
export class ListMessagesByChat implements UseCase<Request, Response> {
  constructor(
    private readonly messageRepository: MessagesRepository,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { chatId, skip, take } = request;

    const chat = await this.chatsRepository.findById(chatId);

    if (!chat) throw new NotFoundError('chat not found');

    const messages = await this.messageRepository.listByChatId({
      chatId,
      skip,
      take,
    });

    return {
      messages,
    };
  }
}

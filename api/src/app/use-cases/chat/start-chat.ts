import { NotFoundError } from '@app/errors/not-found';
import { Chat } from '@app/entities/chat/chat';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { UseCase } from '../use-case';
import { Injectable } from '@nestjs/common';

interface Request {
  chatId: string;
}

interface Response {
  chat: Chat;
}

@Injectable()
export class StartChat implements UseCase<Request, Response> {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { chatId } = request;

    const chat = await this.chatsRepository.findById(chatId);

    if (!chat) throw new NotFoundError('chat not found');

    chat.start();

    await this.chatsRepository.save(chat);

    return { chat };
  }
}

import { Chat } from '@app/entities/chat/chat';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
}

interface Response {
  chats: Chat[];
}

@Injectable()
export class ListUserStartedChats implements UseCase<Request, Response> {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId } = request;

    const chats = await this.chatsRepository.listStartedChatsByUserId(userId);

    return { chats };
  }
}

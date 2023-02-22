import { Chat } from '@app/entities/chat/chat';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
}

interface Response {
  chatRequests: Chat[];
}

@Injectable()
export class ListUserChatRequests implements UseCase<Request, Response> {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId } = request;

    const chatRequests = await this.chatsRepository.listChatRequestsByUserId(
      userId,
    );

    return {
      chatRequests,
    };
  }
}

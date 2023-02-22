import { Message } from '@app/entities/message/message';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { MessagesRepository } from '@app/repositories/messages-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
  take: number;
  skip: number;
}

interface Response {
  messages: {
    chatId: string;
    messages: Message[];
    count: number;
  }[];
}

@Injectable()
export class ListInitialMessages implements UseCase<Request, Response> {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly messagesRepository: MessagesRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { skip, take, userId } = request;

    const chats = await this.chatsRepository.listStartedChatsByUserId(userId);

    const chatsWithMessages = await Promise.all(
      chats.map(async ({ id }) => {
        const messages = await this.messagesRepository.listByChatId({
          chatId: id,
          skip,
          take,
        });

        const count = await this.messagesRepository.countMessagesByChatId(id);

        return {
          chatId: id,
          messages,
          count,
        };
      }),
    );

    return {
      messages: chatsWithMessages,
    };
  }
}

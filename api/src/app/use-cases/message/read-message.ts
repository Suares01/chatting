import { MessagesRepository } from '@app/repositories/messages-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  chatId: string;
  senderId: string;
}

type Response = void;

@Injectable()
export class ReadMessage implements UseCase<Request, Response> {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute(request: Request): Promise<Response> {
    const { chatId, senderId } = request;

    await this.messagesRepository.readMessages({ chatId, senderId });
  }
}

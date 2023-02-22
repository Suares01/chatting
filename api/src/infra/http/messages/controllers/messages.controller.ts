import { ListInitialMessages } from '@app/use-cases/message/list-initial-messages';
import { ListMessagesByChat } from '@app/use-cases/message/list-messages-by-chat';
import { CurrentUser } from '@infra/http/authentication/decorators/current-user.decorator';
import { UserFromJwtDto } from '@infra/http/authentication/dtos/user-from-jwt.dto';
import {
  HttpMessageViewModel,
  MessageViewModel,
} from '@infra/http/view-models/message-view-model';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListMessagesByChatDto } from '../dtos/list-messages-by-chat.dto';

interface MessagesListResponse {
  messages: HttpMessageViewModel[];
}

interface InitialMessagesListResponse {
  messages: {
    chatId: string;
    messages: HttpMessageViewModel[];
    count: number;
  }[];
}

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly listMessagesByChat: ListMessagesByChat,
    private readonly listInitialMessages: ListInitialMessages,
  ) {}

  @Get('/list')
  async listInitial(
    @CurrentUser() user: UserFromJwtDto,
    @Query() query: ListMessagesByChatDto,
  ): Promise<InitialMessagesListResponse> {
    const { id: userId } = user;
    const { skip, take } = query;

    const { messages } = await this.listInitialMessages.execute({
      userId,
      skip,
      take,
    });

    return {
      messages: messages.map((item) => ({
        chatId: item.chatId,
        messages: item.messages.map(MessageViewModel.toHTTP),
        count: item.count,
      })),
    };
  }

  @Get(':chatId')
  async listByChatId(
    @Param('chatId') chatId: string,
    @Query() query: ListMessagesByChatDto,
  ): Promise<MessagesListResponse> {
    const { skip, take } = query;

    const { messages } = await this.listMessagesByChat.execute({
      chatId,
      skip,
      take,
    });

    return {
      messages: messages.map(MessageViewModel.toHTTP),
    };
  }
}

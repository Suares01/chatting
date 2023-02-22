import { ListUserChatRequests } from '@app/use-cases/chat/list-user-chat-requests';
import { ListUserStartedChats } from '@app/use-cases/chat/list-user-started-chats';
import { SendChatRequest } from '@app/use-cases/chat/send-chat-request';
import { StartChat } from '@app/use-cases/chat/start-chat';
import { CurrentUser } from '@infra/http/authentication/decorators/current-user.decorator';
import { UserFromJwtDto } from '@infra/http/authentication/dtos/user-from-jwt.dto';
import {
  ChatViewModel,
  HttpChatViewModel,
} from '@infra/http/view-models/chat-view-model';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestChatDto } from '../dtos/request-chat.dto';

interface ChatsListWithMessagesResponse {
  chats: HttpChatViewModel[];
}

interface ChatDataResponse {
  chat: HttpChatViewModel;
}

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly startChat: StartChat,
    private readonly listUserStartedChats: ListUserStartedChats,
    private readonly sendChatRequest: SendChatRequest,
    private readonly listUserChatRequests: ListUserChatRequests,
  ) {}

  @Get('/list')
  async list(
    @CurrentUser() jwtUser: UserFromJwtDto,
  ): Promise<ChatsListWithMessagesResponse> {
    const { id } = jwtUser;

    const { chats } = await this.listUserStartedChats.execute({ userId: id });

    return {
      chats: chats.map((chat) =>
        ChatViewModel.toHTTP(ChatViewModel.orderUsers(chat, id)),
      ),
    };
  }

  @Get('/list/request')
  async listRequests(@CurrentUser() jwtUser: UserFromJwtDto) {
    const { id } = jwtUser;

    const { chatRequests } = await this.listUserChatRequests.execute({
      userId: id,
    });

    return {
      chatRequests: chatRequests
        .map((chat) => ChatViewModel.orderUsers(chat, id))
        .map(ChatViewModel.toHTTP),
    };
  }

  @Post('request')
  async request(@Body() body: RequestChatDto) {
    const { requestReceiver, requestSender } = body;

    await this.sendChatRequest.execute({ requestReceiver, requestSender });
  }

  @Patch('start/:chatId')
  async start(
    @CurrentUser() jwtUser: UserFromJwtDto,
    @Param('chatId') chatId: string,
  ): Promise<ChatDataResponse> {
    const { id } = jwtUser;
    const { chat } = await this.startChat.execute({ chatId });

    return { chat: ChatViewModel.toHTTP(ChatViewModel.orderUsers(chat, id)) };
  }
}

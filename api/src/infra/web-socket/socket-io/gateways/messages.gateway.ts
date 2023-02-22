import { Message } from '@app/entities/message/message';
import { MessagesRepository } from '@app/repositories/messages-repository';
import { JwtService } from '@infra/jwt/jwt-service';
import { SendMessageProucer } from '@infra/web-socket/jobs/producers/send-message.producer';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthSocket } from '../adapters/redis-io-adapter';
import { MessageDto } from '../dtos/message.dto';
import { ReadMessageDto } from '../dtos/read-message.dto';
import { MessageViewModel } from '../view-model/message-view-model';

@WebSocketGateway({
  namespace: 'messages',
  cors: true,
})
export class MessagesGateway implements OnGatewayConnection {
  constructor(
    private readonly sendMessageProucer: SendMessageProucer,
    private readonly messagesRepository: MessagesRepository,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: AuthSocket) {
    const accessToken =
      client.handshake.auth.accessToken ||
      client.handshake.headers.authentication;

    if (!accessToken || typeof accessToken !== 'string')
      return client.disconnect();

    try {
      const { sub, email, username } =
        this.jwtService.verifyAccess(accessToken);

      client.user = {
        id: sub,
        email,
        username,
      };

      client.join(client.user.id);
    } catch (error: any) {
      return client.disconnect();
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() socket: AuthSocket,
    @MessageBody() body: MessageDto,
  ): Promise<void> {
    const { id, chatId, content, receiverId, senderId, sentAt } = body;

    const message = new Message(
      {
        chatId,
        content,
        receiverId,
        senderId,
        sentAt: new Date(sentAt),
      },
      id,
    );
    const mappedMessage = MessageViewModel.toWS(message);

    await this.sendMessageProucer.execute(mappedMessage);

    socket.broadcast
      .to(message.receiverId)
      .emit('receiveMessage', mappedMessage);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('readMessage')
  async handleReadMessage(
    @ConnectedSocket() socket: AuthSocket,
    @MessageBody() body: ReadMessageDto,
  ): Promise<void> {
    const { chatId, senderId } = body;

    await this.messagesRepository.readMessages({ chatId, senderId });

    socket.broadcast.to(senderId).emit('messagesHaveBeenRead', { chatId });
  }
}

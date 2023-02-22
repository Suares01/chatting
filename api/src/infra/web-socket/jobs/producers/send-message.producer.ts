import { WSMessage } from '@infra/web-socket/socket-io/view-model/message-view-model';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendMessageProucer {
  constructor(@InjectQueue('messages') private messagesQueue: Queue) {}

  async execute(message: WSMessage) {
    await this.messagesQueue.add('sendMessage', message, {
      attempts: 3,
    });
  }
}

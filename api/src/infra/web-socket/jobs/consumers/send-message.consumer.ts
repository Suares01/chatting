import { SendMessage } from '@app/use-cases/message/send-message';
import { WSMessage } from '@infra/web-socket/socket-io/view-model/message-view-model';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('messages')
export class SendMessageConsumer {
  constructor(private readonly sendMessage: SendMessage) {}

  @Process('sendMessage')
  async send(job: Job<WSMessage>) {
    const { data } = job;

    await this.sendMessage.execute(data);
  }
}

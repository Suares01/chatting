import { IsNotEmpty, IsUUID } from 'class-validator';

export class RequestChatDto {
  @IsUUID()
  @IsNotEmpty()
  requestSender: string;

  @IsUUID()
  @IsNotEmpty()
  requestReceiver: string;
}

import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadMessageDto {
  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsUUID()
  @IsNotEmpty()
  chatId: string;
}

import { IsNotEmpty, IsUUID } from 'class-validator';

export class StartChatDto {
  @IsUUID()
  @IsNotEmpty()
  chatId: string;
}

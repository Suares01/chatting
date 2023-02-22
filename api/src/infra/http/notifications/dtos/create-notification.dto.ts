import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @Length(5, 240)
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}

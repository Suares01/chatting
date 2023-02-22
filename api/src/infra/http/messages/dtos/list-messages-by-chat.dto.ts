import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ListMessagesByChatDto {
  @IsNotEmpty()
  @Type(() => Number)
  skip: number;

  @IsNotEmpty()
  @Type(() => Number)
  take: number;
}

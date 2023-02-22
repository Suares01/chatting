import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListUsersDto {
  @IsString()
  @IsNotEmpty()
  search: string;

  @Type(() => Number)
  @IsNotEmpty()
  skip: number;

  @Type(() => Number)
  @IsNotEmpty()
  take: number;
}

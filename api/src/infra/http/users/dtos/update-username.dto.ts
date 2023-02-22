import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUsernameDto {
  @IsString()
  @MaxLength(12)
  @MinLength(4)
  @IsNotEmpty()
  newUsername: string;
}

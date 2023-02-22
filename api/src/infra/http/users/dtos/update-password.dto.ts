import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

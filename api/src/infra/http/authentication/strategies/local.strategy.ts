import { ValidateUser } from '@app/use-cases/authentication/validate-user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserFromJwtDto } from '../dtos/user-from-jwt.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUser: ValidateUser) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserFromJwtDto> {
    const { user } = await this.validateUser.execute({
      email,
      password,
    });

    return {
      id: user.id,
      email: user.email.value,
      username: user.username.value,
    };
  }
}

import { UnauthorizedError } from '@app/errors/unauthorized';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenDto } from '../dtos/refresh-token-payload.dto';
import { UserFromJwtDto } from '../dtos/user-from-jwt.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('auth.refreshTokenSecret'),
    });
  }

  async validate(payload: RefreshTokenDto): Promise<UserFromJwtDto> {
    const user = await this.usersRepository.findById(payload.sub);

    if (!user)
      throw new UnauthorizedError('the owner of this token does not exist');

    if (user.disabledAt)
      throw new UnauthorizedError('this account is disabled');

    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
    };
  }
}

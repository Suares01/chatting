import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwtDto } from '../dtos/user-from-jwt.dto';
import { UserPayloadDto } from '../dtos/user-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('auth.accessTokenSecret'),
    });
  }

  async validate(payload: UserPayloadDto): Promise<UserFromJwtDto> {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}

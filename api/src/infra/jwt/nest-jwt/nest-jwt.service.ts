import { Injectable } from '@nestjs/common';
import { AccessTokenPayload, JwtService } from '../jwt-service';
import { JwtService as NestJwt } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestJwtService implements JwtService {
  constructor(
    private readonly jwtService: NestJwt,
    private readonly config: ConfigService,
  ) {}

  private accessTokenSecret = this.config.get<string>('auth.accessTokenSecret');
  private refreshTokenSecret = this.config.get<string>(
    'auth.refreshTokenSecret',
  );

  private apiURL = this.config.get<string>('apiURL');

  access(payload: string | object | Buffer, userId: string): string {
    return this.jwtService.sign(payload, {
      subject: userId,
      expiresIn: '1d',
      audience: this.apiURL,
      issuer: 'chatting.api',
      algorithm: 'HS256',
      secret: this.accessTokenSecret,
      header: {
        alg: 'HS256',
        typ: 'at-JWT',
      },
    });
  }

  refresh(userId: string): string {
    return this.jwtService.sign(
      {},
      {
        subject: userId,
        expiresIn: '7d',
        audience: this.apiURL,
        issuer: 'chatting.api',
        algorithm: 'HS256',
        secret: this.refreshTokenSecret,
        header: {
          alg: 'HS256',
          typ: 'rt-JWT',
        },
      },
    );
  }

  verifyAccess(token: string): AccessTokenPayload {
    const payload = this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.accessTokenSecret,
    });

    return payload;
  }
}

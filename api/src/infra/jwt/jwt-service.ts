export interface AccessTokenPayload {
  sub: string;
  email: string;
  username: string;
  iat: string;
  exp: string;
  aud: string;
  iss: string;
}

export abstract class JwtService {
  abstract access(payload: string | object | Buffer, userId: string): string;
  abstract refresh(userId: string): string;
  abstract verifyAccess(token: string): AccessTokenPayload;
}

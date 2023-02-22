export interface UserPayloadDto {
  sub: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

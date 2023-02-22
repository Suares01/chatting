import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { UserFromJwtDto } from '../dtos/user-from-jwt.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserFromJwtDto => {
    const request = context.switchToHttp().getRequest<AuthRequestDto>();

    return request.user;
  },
);

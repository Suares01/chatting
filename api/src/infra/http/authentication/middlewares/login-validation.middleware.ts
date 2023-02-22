import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginDto();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      const errors = validations.reduce((acc, curr) => {
        return [
          ...acc,
          ...Object.values(
            curr.constraints as {
              [type: string]: string;
            },
          ),
        ];
      }, [] as string[]);

      throw new BadRequestException(errors);
    }

    next();
  }
}

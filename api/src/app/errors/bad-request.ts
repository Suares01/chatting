import { AppError } from './app-error';

export class BadRequestError extends AppError {
  constructor(message: string, description?: string) {
    const code = 400;
    super(message, code, description);
  }
}

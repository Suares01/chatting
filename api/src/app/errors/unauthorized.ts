import { AppError } from './app-error';

export class UnauthorizedError extends AppError {
  constructor(message: string, description?: string) {
    const code = 401;
    super(message, code, description);
  }
}

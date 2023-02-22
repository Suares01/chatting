import { AppError } from './app-error';

export class NotFoundError extends AppError {
  constructor(message: string, description?: string) {
    const code = 404;
    super(message, code, description);
  }
}

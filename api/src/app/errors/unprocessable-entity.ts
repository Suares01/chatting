import { AppError } from './app-error';

export class UnprocessableEntityError extends AppError {
  constructor(message: string, description?: string) {
    const code = 422;
    super(message, code, description);
  }
}

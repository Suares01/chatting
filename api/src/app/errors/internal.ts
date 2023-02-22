import { AppError } from './app-error';

export class InternalError extends AppError {
  constructor(message: string, description?: string) {
    const code = 500;
    super(message, code, description);
  }
}

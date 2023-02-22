import { AppError } from './app-error';

export class ConflictError extends AppError {
  constructor(message: string, description?: string) {
    const code = 409;
    super(message, code, description);
  }
}

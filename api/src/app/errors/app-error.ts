interface AppErrorProps {
  message: string;
  code: number;
  description?: string;
}

export abstract class AppError extends Error implements AppErrorProps {
  constructor(
    public message: string,
    public code: number,
    public description?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

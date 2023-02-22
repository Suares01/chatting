import { ConflictError } from '@app/errors/conflict';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export class UniqueConstraintError extends ConflictError {
  constructor(error: PrismaClientKnownRequestError) {
    const uniqueField = error!.meta!.target as string;

    super(`A record with this '${uniqueField}' already exists`);
  }
}

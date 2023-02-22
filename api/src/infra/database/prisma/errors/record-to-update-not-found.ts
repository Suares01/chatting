import { NotFoundError } from '@app/errors/not-found';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export class RecordToUpdateNotFound extends NotFoundError {
  constructor(error: PrismaClientKnownRequestError) {
    super(error.message);
  }
}

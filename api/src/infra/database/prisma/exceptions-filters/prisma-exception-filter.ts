import { ExceptionFilter, Catch } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { handlePrismaDatabaseErrors } from '../errors/handle-prisma-database-errors';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError) {
    const error = handlePrismaDatabaseErrors(exception);

    throw error;
  }
}

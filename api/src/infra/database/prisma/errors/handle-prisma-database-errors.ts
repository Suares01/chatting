import { PrismaErros } from './prisma-erros';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RecordToUpdateNotFound } from './record-to-update-not-found';
import { UniqueConstraintError } from './unique-constraint-error';
import { InternalError } from '@app/errors/internal';
import { AppError } from '@app/errors/app-error';

export const handlePrismaDatabaseErrors = (
  error: PrismaClientKnownRequestError,
): AppError => {
  switch (error.code) {
    case PrismaErros.UniqueConstraintFail:
      return new UniqueConstraintError(error);

    case PrismaErros.RecordToUpdateNotFound:
      return new RecordToUpdateNotFound(error);

    default:
      return new InternalError(error.message);
  }
};

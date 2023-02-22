import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt.service';
import { HashService } from './hash-service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BcryptService,
    },
  ],
  exports: [HashService],
})
export class HashModule {}

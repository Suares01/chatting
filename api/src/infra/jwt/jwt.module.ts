import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { NestJwtService } from './nest-jwt/nest-jwt.service';
import { JwtService } from './jwt-service';

@Module({
  imports: [NestJwtModule],
  providers: [
    {
      provide: JwtService,
      useClass: NestJwtService,
    },
  ],
  exports: [JwtService],
})
export class JwtModule {}

import { ValidateUser } from '@app/use-cases/authentication/validate-user';
import { DatabaseModule } from '@infra/database/database.module';
import { HashModule } from '@infra/hash/hash.module';
import { JwtModule } from '@infra/jwt/jwt.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './controllers/authentication.controller';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [JwtModule, PassportModule, DatabaseModule, HashModule],
  controllers: [AuthenticationController],
  providers: [ValidateUser, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
})
export class HttpAuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes({ path: 'login', method: RequestMethod.POST });
  }
}

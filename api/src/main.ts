import { PrismaService } from '@infra/database/prisma/prisma.service';
import { RedisIoAdapter } from '@infra/web-socket/socket-io/adapters/redis-io-adapter';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from '@infra/exception-filters/app-exception-filters';
import { PrismaExceptionFilter } from '@infra/database/prisma/exceptions-filters/prisma-exception-filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.get<string>('webURL'),
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new AppExceptionFilter());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = config.get<number>('port') as number;

  await app.listen(port, async () =>
    Logger.log(`Server is running on ${await app.getUrl()}`, 'Bootstrap'),
  );
}
bootstrap();

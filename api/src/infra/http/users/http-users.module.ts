import { CreateUser } from '@app/use-cases/user/create-user';
import { DisableUser } from '@app/use-cases/user/disable-user';
import { GetUser } from '@app/use-cases/user/get-user';
import { ListUsers } from '@app/use-cases/user/list-users';
import { UpdatePassword } from '@app/use-cases/user/update-password';
import { UpdateUsername } from '@app/use-cases/user/update-username';
import { Module } from '@nestjs/common';
import { HashModule } from '@infra/hash/hash.module';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [HashModule, DatabaseModule],
  controllers: [UsersController],
  providers: [
    CreateUser,
    GetUser,
    DisableUser,
    ListUsers,
    UpdatePassword,
    UpdateUsername,
  ],
})
export class HttpUsersModule {}

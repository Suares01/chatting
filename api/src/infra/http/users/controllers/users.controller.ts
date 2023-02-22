import { CreateUser } from '@app/use-cases/user/create-user';
import { DisableUser } from '@app/use-cases/user/disable-user';
import { GetUser } from '@app/use-cases/user/get-user';
import { ListUsers } from '@app/use-cases/user/list-users';
import { UpdatePassword } from '@app/use-cases/user/update-password';
import { UpdateUsername } from '@app/use-cases/user/update-username';
import { CurrentUser } from '@infra/http/authentication/decorators/current-user.decorator';
import { IsPublic } from '@infra/http/authentication/decorators/is-public.decorator';
import { UserFromJwtDto } from '@infra/http/authentication/dtos/user-from-jwt.dto';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DisableUserDto } from '../dtos/disable-user.dto';
import { ListUsersDto } from '../dtos/list-users.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { UpdateUsernameDto } from '../dtos/update-username.dto';
import {
  HttpUserViewModel,
  UserViewModel,
} from '../../view-models/user-view-model';

interface UserDataResponse {
  user: HttpUserViewModel;
}

interface ListUsersResponse {
  users: HttpUserViewModel[];
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUser: GetUser,
    private readonly listUsers: ListUsers,
    private readonly updatePassword: UpdatePassword,
    private readonly updateUsername: UpdateUsername,
    private readonly disableUser: DisableUser,
  ) {}

  @Get('me')
  async me(@CurrentUser() jwtUser: UserFromJwtDto): Promise<UserDataResponse> {
    const { id } = jwtUser;

    const { user } = await this.getUser.execute({ userId: id });

    return { user: UserViewModel.toHTTP(user) };
  }

  @Get()
  async list(@Query() query: ListUsersDto): Promise<ListUsersResponse> {
    const { search, skip, take } = query;

    const { users } = await this.listUsers.execute({
      search,
      skip,
      take,
    });

    return {
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @IsPublic()
  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserDataResponse> {
    const { email, password, username } = body;

    const { user } = await this.createUser.execute({
      email,
      password,
      username,
    });

    return { user: UserViewModel.toHTTP(user) };
  }

  @Patch('update/password')
  async changePassword(
    @CurrentUser() user: UserFromJwtDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<void> {
    const { id } = user;
    const { currentPassword, newPassword } = body;

    await this.updatePassword.execute({
      currentPassword,
      newPassword,
      userId: id,
    });
  }

  @Patch('update/username')
  async changeUsername(
    @CurrentUser() user: UserFromJwtDto,
    @Body() body: UpdateUsernameDto,
  ): Promise<void> {
    const { id } = user;
    const { newUsername } = body;

    await this.updateUsername.execute({ newUsername, userId: id });
  }

  @Patch('disable')
  async disable(
    @CurrentUser() user: UserFromJwtDto,
    @Body() body: DisableUserDto,
  ): Promise<void> {
    const { id } = user;
    const { password } = body;

    await this.disableUser.execute({ password, userId: id });
  }
}

import { User } from '@app/entities/user/user';

export interface HttpUserViewModel {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export class UserViewModel {
  static toHTTP(user: User): HttpUserViewModel {
    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
      createdAt: user.createdAt,
    };
  }
}

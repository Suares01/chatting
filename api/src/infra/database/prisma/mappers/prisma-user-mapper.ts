import { User } from '@app/entities/user/user';
import { Email } from '@app/entities/user/value-objects/email';
import { PasswordHash } from '@app/entities/user/value-objects/password-hash';
import { Username } from '@app/entities/user/value-objects/username';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
      password: user.password.value,
      verified: user.verified,
      disabledAt: user.disabledAt as Date | null,
      chatIds: user.chats,
      createdAt: user.createdAt,
    };
  }

  static toDomain(user: PrismaUser): User {
    return new User(
      {
        username: new Username(user.username),
        email: new Email(user.email),
        password: new PasswordHash(user.password),
        verified: user.verified,
        disabledAt: user.disabledAt,
        chats: user.chatIds,
        createdAt: user.createdAt,
      },
      user.id,
    );
  }
}

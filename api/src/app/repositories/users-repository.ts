import { User } from '@app/entities/user/user';

export interface FindUsers {
  search: string;
  take: number;
  skip: number;
}

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findMany(data: FindUsers): Promise<User[]>;
  abstract create(user: User): Promise<User>;
  abstract save(user: User): Promise<User>;
}

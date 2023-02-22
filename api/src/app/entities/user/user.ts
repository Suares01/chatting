import { Replace } from '@helpers/Replace';
import { Entity } from '../entiity';
import { Email } from './value-objects/email';
import { Password } from './value-objects/password';
import { PasswordHash } from './value-objects/password-hash';
import { Username } from './value-objects/username';

export interface UserProps {
  username: Username;
  email: Email;
  password: Password | PasswordHash;
  verified: boolean;
  disabledAt?: Date | null;
  chats: string[];
  createdAt: Date;
}

type ReplacedUserProps = Replace<
  UserProps,
  {
    createdAt?: Date;
    verified?: boolean;
    chats?: string[];
  }
>;

export class User extends Entity<UserProps> {
  public get id(): string {
    return this._id;
  }

  public get username(): Username {
    return this.props.username;
  }

  public set username(username: Username) {
    this.props.username = username;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get password(): Password | PasswordHash {
    return this.props.password;
  }

  public set password(password: Password | PasswordHash) {
    this.props.password = password;
  }

  public get chats(): string[] {
    return this.props.chats;
  }

  public set chats(chats: string[]) {
    this.props.chats = chats;
  }

  public get verified(): boolean {
    return this.props.verified;
  }

  public verify(): void {
    this.props.verified = true;
  }

  public get disabledAt(): Date | null | undefined {
    return this.props.disabledAt;
  }

  public disable(): void {
    this.props.disabledAt = new Date();
  }

  public enable(): void {
    this.props.disabledAt = null;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  constructor(props: ReplacedUserProps, id?: string) {
    super(
      {
        ...props,
        verified: props.verified ?? false,
        createdAt: props.createdAt ?? new Date(),
        chats: props.chats ?? [],
      },
      id,
    );
  }
}

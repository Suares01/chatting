import { Replace } from '@helpers/Replace';
import { Entity } from '../entiity';
import { Content } from './value-objects/content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  public get id(): string {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}

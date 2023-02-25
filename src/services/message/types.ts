export type TMessageType =
  | 'text'
  | 'audio'
  | 'document'
  | 'image'
  | 'video'
  | 'figure'
  | 'microphone';

export type TMessageDelivery = 'send' | 'delivered';

export interface IMessageSchema {
  _id?: string;
  chat: string;
  userSent: string;
  value: string;
  reply?: string;
  like?: string[];
  startChat?: boolean;
  type: TMessageType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  seenUsers?: string[];
  delivery?: TMessageDelivery;
  removeToUsers?: string[];
}

export interface IMessagesByChat {
  message: string;
  messages: IMessageSchema[];
}

export interface IMessageCreate {
  message: string;
  messageCreated: IMessageSchema;
  message_id_temp: string;
}

import { IChatSchema } from '../../../../../../services/chat/types';
import {IMessageSchema} from '../../../../../../services/message/types';

export interface IMessageProps extends IMessageSchema {
  message_id_temp?: any;
  message_send_error?: boolean;
  setMessageId: (_id: string, type: 'insert' | 'return') => void;
  messagesSelected: string[];
  chatData: IChatSchema;
};

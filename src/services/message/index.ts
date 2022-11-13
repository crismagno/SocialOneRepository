import request from '../../helpers/request';
import {IMessageCreate, IMessagesByChat} from './types';

export const create = async (
  userId: string,
  chatId: string,
  message_id_temp: string,
  message: any,
): Promise<IMessageCreate | never> => {
  try {
    const body = {
      userId,
      chatId,
      message_id_temp,
      message,
    };

    const response = await request.requestApi({
      route: `message/create`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessagesByChatId = async (
  userId: string,
  chatId: string,
  limit: number,
  skip: number,
): Promise<IMessagesByChat | never> => {
  try {
    const body = {
      userId,
      chatId,
      limit,
      skip,
    };

    const response = await request.requestApi({
      route: `message/by_chat_id`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessagesByChatIdAndDate = async (
  userId: string,
  chatId: string,
  lastMessageCreatedAt: Date | string,
): Promise<IMessagesByChat | never> => {
  try {
    const body = {
      userId,
      chatId,
      lastMessageCreatedAt,
    };

    const response = await request.requestApi({
      route: `message/by_chat_id_and_date`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeMessages = async (
  userId: string,
  chatId: string,
  messagesToRemove: string[],
  removeToUsers: string[],
): Promise<IMessagesByChat | never> => {
  try {
    const body = {
      userId,
      chatId,
      messagesToRemove,
      removeToUsers,
    };

    const response = await request.requestApi({
      route: `message/remove`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

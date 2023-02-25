import request from './../../helpers/request';
import {IChatReturn, IResponseDataGetChatByUser} from './types';

export const create = async (
  creator: string,
  person: string,
): Promise<IChatReturn | never> => {
  try {
    const body = {
      creator,
      person,
    };

    const response = await request.requestApi({
      route: `chat`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatsByUser = async (
  userId: string,
  searchValue: string,
  skip: number,
  limit: number,
): Promise<IResponseDataGetChatByUser | never> => {
  try {
    const body = {
      userId,
      searchValue,
      skip,
      limit,
    };

    const response = await request.requestApi({
      route: `chat/by_user`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatById = async (
  userId: string,
  chatId: string,
): Promise<IChatReturn | never> => {
  try {
    const body = {
      userId,
      chatId,
    };

    const response = await request.requestApi({
      route: `chat/by_chat_id`,
      body,
      method: 'POST',
      authorization: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

import { useDispatch, useSelector } from 'react-redux';
import { IChatItem } from '../../../types';
import { chatStore } from './../../reducers/chat/variables';
import { IActionsChat } from './types';
import { ICombineReducers } from "./../../types";
import { IChatStore } from '../../reducers/chat/types';

const ActionsChat = (): IActionsChat => {

  const dispatch = useDispatch();
  const chatState: IChatStore = useSelector((state: ICombineReducers): IChatStore => state.chats);

  const setChatsOnState = (chats: IChatItem[]): void => {
    dispatch({
      type: chatStore.SET_CHATS,
      payload: chats,
    });
  };

  const addChatsOnState = (chats: IChatItem[]): void => {
    dispatch({
      type: chatStore.ADD_NEW_CHATS,
      payload: chats,
    });
  };

  const setSearchValue = (searchValue: string): void => {
    dispatch({
      type: chatStore.SET_SEARCH_VALUE_CHAT,
      payload: searchValue,
    });
  };

  const updateStatusOnlineOfPerson = (userId: string, status: boolean) => {
    dispatch({
      type: chatStore.UPDATE_STATUS_ONLINE_PERSON_CHAT,
      payload: {
        userId,
        status
      }
    });
  };

  const updateStatusOnlineOfAllPerson = (status: boolean) => {
    dispatch({
      type: chatStore.UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT,
      payload: {
        status
      }
    });
  };

  return {
    chatState,
    setChatsOnState,
    addChatsOnState,
    setSearchValue,
    updateStatusOnlineOfPerson,
    updateStatusOnlineOfAllPerson
  };
};

export default ActionsChat;

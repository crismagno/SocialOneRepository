import {useDispatch, useSelector} from 'react-redux';
import {IChatItem, ISetIdUserOnSeenMessages, IUserChat} from '../../types';
import {
  ADD_NEW_CHATS,
  SET_CHATS,
  SET_SEARCH_VALUE_CHAT,
  UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT,
  UPDATE_STATUS_ONLINE_PERSON_CHAT,
  IChatInitialState,
  IChatActionsStore,
  ISetChatsAction,
  IAddChatsAction,
  ISetSearchValueChatAction,
  IUpdateStatusOnlineOfPersonChatAction,
  IUpdateStatusOnlineOfAllPersonChatAction,
  IUpdateLastMessageChatAction,
  UPDATE_LAST_MESSAGE_CHAT,
  UPDATE_MESSAGE_CHAT,
  IUpdateMessageChatAction,
  UPDATE_PROPERTY_USER_CHAT,
  IUpdatePropertyChaAction,
  TFUpdatePropertyChat,
  IPutUserOnSeenLastMessageByChatAction,
  PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT,
} from './types';
import {ICombineReducers} from './../types';
import {IMessageSchema} from '../../services/message/types';

const Actions = (): IChatActionsStore => {
  const dispatch = useDispatch();
  const state: IChatInitialState = useSelector(
    (state: ICombineReducers): IChatInitialState => state.chats,
  );

  const setChats = (chats: IChatItem[] | any): void => {
    dispatch<ISetChatsAction>({
      type: SET_CHATS,
      payload: {
        chats,
      },
    });
  };

  const addChats = (chats: IChatItem[]): void => {
    dispatch<IAddChatsAction>({
      type: ADD_NEW_CHATS,
      payload: {
        chats,
      },
    });
  };

  const setSearchValue = (searchValue: string): void => {
    dispatch<ISetSearchValueChatAction>({
      type: SET_SEARCH_VALUE_CHAT,
      payload: {
        searchValue,
      },
    });
  };

  const updateStatusOnlineOfPerson = (userId: string, status: boolean) => {
    dispatch<IUpdateStatusOnlineOfPersonChatAction>({
      type: UPDATE_STATUS_ONLINE_PERSON_CHAT,
      payload: {
        userId,
        status,
      },
    });
  };

  const updateStatusOnlineOfAllPerson = (status: boolean) => {
    dispatch<IUpdateStatusOnlineOfAllPersonChatAction>({
      type: UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT,
      payload: {
        status,
      },
    });
  };

  const updateLastMessageChat = (chatId: string, message: IMessageSchema) => {
    dispatch<IUpdateLastMessageChatAction>({
      type: UPDATE_LAST_MESSAGE_CHAT,
      payload: {
        chatId,
        message,
      },
    });
  };

  const updateMessageChat = (
    chatId: string,
    messages: IMessageSchema[],
  ): void => {
    dispatch<IUpdateMessageChatAction>({
      type: UPDATE_MESSAGE_CHAT,
      payload: {
        chatId,
        messages,
      },
    });
  };

  const updatePropertyChat: TFUpdatePropertyChat = <P extends keyof IChatItem>(
    chatId: string,
    userId: string,
    property: P,
    newValue: any,
  ): void => {
    dispatch<IUpdatePropertyChaAction>({
      type: UPDATE_PROPERTY_USER_CHAT,
      payload: {
        chatId,
        userId,
        newValue,
        property,
      },
    });
  };

  const putUserOnSeenLastMessageByChat = <T extends ISetIdUserOnSeenMessages>(data: T): void => {
    dispatch<IPutUserOnSeenLastMessageByChatAction>({
      type: PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT,
      payload: data,
    });
  };

  return {
    state,
    setChats,
    addChats,
    setSearchValue,
    updateStatusOnlineOfPerson,
    updateStatusOnlineOfAllPerson,
    updateLastMessageChat,
    updateMessageChat,
    updatePropertyChat,
    putUserOnSeenLastMessageByChat
  };
};

export default Actions;

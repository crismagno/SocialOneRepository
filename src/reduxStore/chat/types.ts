import {IMessageSchema} from '../../services/message/types';
import {IChatItem, ISetIdUserOnSeenMessages, IUserChat} from '../../types';

export const SET_CHATS = 'SET_CHATS';
export const ADD_NEW_CHATS = 'ADD_NEW_CHATS';
export const SET_SEARCH_VALUE_CHAT = 'SET_SEARCH_VALUE_CHAT';
export const UPDATE_STATUS_ONLINE_PERSON_CHAT =
  'UPDATE_STATUS_ONLINE_PERSON_CHAT';
export const UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT =
  'UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT';
export const UPDATE_LAST_MESSAGE_CHAT = 'UPDATE_LAST_MESSAGE_CHAT';
export const UPDATE_MESSAGE_CHAT = 'UPDATE_MESSAGE_CHAT';
export const UPDATE_PROPERTY_USER_CHAT = 'UPDATE_PROPERTY_USER_CHAT';
export const PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT = "PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT";

export interface IChatInitialState {
  chats: IChatItem[];
  searchValue: string;
}

export interface ISetChatsAction {
  type: typeof SET_CHATS;
  payload: {
    chats: IChatItem[];
  };
}

export interface IAddChatsAction {
  type: typeof ADD_NEW_CHATS;
  payload: {
    chats: IChatItem[];
  };
}

export interface ISetSearchValueChatAction {
  type: typeof SET_SEARCH_VALUE_CHAT;
  payload: {
    searchValue: string;
  };
}

export interface IUpdateStatusOnlineOfPersonChatAction {
  type: typeof UPDATE_STATUS_ONLINE_PERSON_CHAT;
  payload: {
    userId: string;
    status: boolean;
  };
}

export interface IUpdateStatusOnlineOfAllPersonChatAction {
  type: typeof UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT;
  payload: {
    status: boolean;
  };
}

export interface IUpdateLastMessageChatAction {
  type: typeof UPDATE_LAST_MESSAGE_CHAT;
  payload: {
    chatId: string;
    message: IMessageSchema;
  };
}

export interface IUpdateMessageChatAction {
  type: typeof UPDATE_MESSAGE_CHAT;
  payload: {
    chatId: string;
    messages: IMessageSchema[];
  };
}

export interface IUpdatePropertyChaAction {
  type: typeof UPDATE_PROPERTY_USER_CHAT;
  payload: {
    chatId: string;
    property: keyof IChatItem;
    newValue: any;
    userId?: string;
  };
}

export interface IPutUserOnSeenLastMessageByChatAction {
  type: typeof PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT;
  payload: ISetIdUserOnSeenMessages;
}

export type TChatActions =
  | ISetChatsAction
  | IAddChatsAction
  | ISetSearchValueChatAction
  | IUpdateStatusOnlineOfPersonChatAction
  | IUpdateStatusOnlineOfAllPersonChatAction
  | IUpdateLastMessageChatAction
  | IUpdatePropertyChaAction
  | any;

export type TFUpdatePropertyChat = <P extends keyof IChatItem>(
  chatId: string,
  userId: string,
  property: P,
  newValue: any,
) => void;

export interface IChatActionsStore {
  state: IChatInitialState;
  setChats: (chats: IChatItem[] | any) => void;
  addChats: (chats: IChatItem[]) => void;
  setSearchValue: (searchValue: string) => void;
  updateStatusOnlineOfPerson: (userId: string, status: boolean) => void;
  updateStatusOnlineOfAllPerson: (status: boolean) => void;
  updateLastMessageChat: (chatId: string, message: IMessageSchema) => void;
  updateMessageChat: (chatId: string, messages: IMessageSchema[]) => void;
  updatePropertyChat: TFUpdatePropertyChat;
  putUserOnSeenLastMessageByChat: <T extends ISetIdUserOnSeenMessages>(data: T) => void;
}

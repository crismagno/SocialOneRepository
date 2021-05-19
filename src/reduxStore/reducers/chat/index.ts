import { IChatItem, IPeopleItem } from '../../../types';
import { IActionReducer } from '../types';
import { initialState } from './initialState';
import { IChatStore } from './types';
import { chatStore } from './variables';

export const reducer = (
  state: IChatStore = initialState,
  action: IActionReducer,
): IChatStore => {
  const { type, payload } = action;

  switch (type) {
    case chatStore.SET_CHATS:
      return {
        ...state,
        chats: payload
      };
    case chatStore.ADD_NEW_CHATS:

      if (state.searchValue.trim()) return state;
      const newChats = [...state.chats, ...payload];

      return {
        ...state,
        chats: newChats
      };
    case chatStore.SET_SEARCH_VALUE_CHAT:
      return {
        ...state,
        searchValue: payload
      };
    case chatStore.UPDATE_STATUS_ONLINE_PERSON_CHAT:
 
      const newChatsUpdateOnlineUser: IChatItem[] = 
      state.chats.map((chat: IChatItem): IChatItem => {
        if (chat?.users?.length == 2) {
          chat.users = chat.users.map((person: IPeopleItem): IPeopleItem => {
            if (person._id == payload?.userId) {
              person.online = payload?.status;
            };
            return person;
          })
          return chat;
        };
        return chat;
      });

      return {
        ...state,
        chats: [...newChatsUpdateOnlineUser]
      };
    case chatStore.UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT:
      const newChatsUpdateOnlineAllPerson: IChatItem[] = 
      state.chats.map((chat: IChatItem): IChatItem => {
        if (chat?.users?.length == 2) {
          chat.users = chat.users.map((person: IPeopleItem): IPeopleItem => {
            person.online = payload?.status;
            return person;
          })
          return chat;
        };
        return chat;
      });

      return {
        ...state,
        chats: [...newChatsUpdateOnlineAllPerson]
      };
    default:
      return state;
  };
};

export default reducer;
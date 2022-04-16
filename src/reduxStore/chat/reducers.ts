import { IMessageSchema } from '../../services/message/types';
import {IChatItem, IPeopleItem} from '../../types';
import {initialState} from './initialState';
import {
  ADD_NEW_CHATS,
  IChatInitialState,
  PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT,
  SET_CHATS,
  SET_SEARCH_VALUE_CHAT,
  TChatActions,
  UPDATE_LAST_MESSAGE_CHAT,
  UPDATE_MESSAGE_CHAT,
  UPDATE_PROPERTY_USER_CHAT,
  UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT,
  UPDATE_STATUS_ONLINE_PERSON_CHAT,
} from './types';

export const chats = (
  state: IChatInitialState = initialState,
  action: TChatActions,
): IChatInitialState => {
  const {type, payload} = action;

  switch (type) {
    case SET_CHATS:
      let chats = payload.chats;
      if (typeof payload.chats === "function") {
        chats = payload.chats(state?.chats)
      }

      return {
        ...state,
        chats,
      };
    case ADD_NEW_CHATS:
      if (state.searchValue.trim()) return state;
      const newChats = [...state.chats, ...payload.chats];

      return {
        ...state,
        chats: newChats,
      };
    case SET_SEARCH_VALUE_CHAT:
      return {
        ...state,
        searchValue: payload?.searchValue || '',
      };
    case UPDATE_STATUS_ONLINE_PERSON_CHAT:
      const newChatsUpdateOnlineUser: IChatItem[] = state.chats.map(
        (chat: IChatItem): IChatItem => {
          if (chat?.users?.length == 2) {
            chat.users = chat.users.map(
              (person: IPeopleItem): IPeopleItem => {
                if (person._id == payload?.userId) {
                  person.online = payload?.status;
                }
                return person;
              },
            );
            return chat;
          }
          return chat;
        },
      );

      return {
        ...state,
        chats: [...newChatsUpdateOnlineUser],
      };
    case UPDATE_STATUS_ONLINE_ALL_PERSON_CHAT:
      const newChatsUpdateOnlineAllPerson: IChatItem[] = state.chats.map(
        (chat: IChatItem): IChatItem => {
          if (chat?.users?.length == 2) {
            chat.users = chat.users.map(
              (person: IPeopleItem): IPeopleItem => {
                person.online = payload?.status;
                return person;
              },
            );
            return chat;
          }
          return chat;
        },
      );

      return {
        ...state,
        chats: [...newChatsUpdateOnlineAllPerson],
      };
    case UPDATE_LAST_MESSAGE_CHAT:

      // validar se chatId exists nos chats
      let validateIfChatIdExists: number = state?.chats
        ?.findIndex((chat: IChatItem) => chat?._id === payload?.chatId);
      if (validateIfChatIdExists === -1) return state;

      const newChatsUpdateLAstMessageOfChat: IChatItem[] = state.chats.map(
        (chat: IChatItem): IChatItem => {
          if (chat?._id === payload?.chatId) {
            chat.lastMessage = payload?.message ;   
          }
          return chat;
        },
      );

      return {
        ...state,
        chats: [...newChatsUpdateLAstMessageOfChat],
      };
    case UPDATE_MESSAGE_CHAT:

      // validar se chatId exists nos chats
      let validateIfChatIdExists2: number = state?.chats
        ?.findIndex((chat: IChatItem) => chat?._id === payload?.chatId);
      if (validateIfChatIdExists2 === -1) return state;

      // atualizar mensagem do chat
      const newChatsUpdateLAstMessageOfChat2: IChatItem[] = state.chats.map(
        (chat: IChatItem): IChatItem => {
          if (chat?._id === payload?.chatId) {
            const findIndexMessage = payload?.messages.findIndex(
              (message: IMessageSchema) => message?._id === chat.lastMessage?._id
            );
            if (findIndexMessage > -1) {
              chat.lastMessage = payload?.messages[findIndexMessage] ;   
            }
          }
          return chat;
        },
      );

      return {
        ...state,
        chats: [...newChatsUpdateLAstMessageOfChat2],
      };
    case UPDATE_PROPERTY_USER_CHAT:

      // validar se chatId exists nos chats
      let validateIfChatIdExists3: number = state?.chats
        ?.findIndex((chat: IChatItem) => chat?._id === payload?.chatId);
      if (validateIfChatIdExists3 === -1) return state;

      // atualizar mensagem do chat
      const newChatsUpdateLAstMessageOfChat3: IChatItem[] = state.chats.map(
        (chat: IChatItem): IChatItem => {
          if (chat?._id === payload?.chatId) {
            chat[payload?.property] = payload?.newValue 
          }
          return chat;
        },
      );

      return {
        ...state,
        chats: [...newChatsUpdateLAstMessageOfChat3],
      };
    case PUT_USER_ON_SEEN_LAST_MESSAGE_BY_CHAT:

      // validar se chatId exists nos chats
      let validateIfChatIdExists4: number = state?.chats
        ?.findIndex((chat: IChatItem) => chat?._id === payload?.chatId);
      if (validateIfChatIdExists4 === -1) return state;

      // atualizar visto da ultima mensagem do chat
      const chatsUpdated: IChatItem[] = state?.chats?.map((chat: IChatItem) => {
        if (
          chat?._id === payload.chatId &&
          payload?.messagesIds?.indexOf(chat?.lastMessage?._id) != -1 &&
          chat?.lastMessage?.seenUsers?.indexOf(payload?.userId) == -1
          ) {
          chat?.lastMessage?.seenUsers?.push(payload?.userId);
        }
        return chat;
      });
      
      return {
        ...state,
        chats: [...chatsUpdated]
      }
    default:
      return state;
  }
};

export default chats;

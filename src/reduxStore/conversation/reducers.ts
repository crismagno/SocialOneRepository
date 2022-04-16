import {IMessageProps} from '../../app/Conversation/components/Center/components/Message/types';
import {IMessageSchema} from '../../services/message/types';
import {IPeopleItem} from '../../types';
import {initialState} from './initialState';
import {
  SET_CHAT_CONVERSATION,
  IConversation,
  IConversationInitialState,
  SET_MESSAGES_CONVERSATION,
  SET_TEXT_CONVERSATION,
  TConversationActions,
  SET_USER_CHAT_CONVERSATION,
  UPDATE_PROPERTY_USER_CHAT_CONVERSATION,
  SET_MESSAGES_SELECTED,
  SET_MESSAGES_ATUAL_CONVERSATION,
  SET_CHAT_DATA,
  PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL,
  INSERT_NEW_MESSAGE_ON_MESSAGES,
  UPDATE_MESSAGES_CHAT_ATUAL,
} from './types';
import { IndexActionsStore } from "./../index";

export const conversation = (
  state: IConversationInitialState = initialState,
  action: TConversationActions,
): IConversationInitialState => {
  const {type, payload} = action;

  switch (type) {
    case SET_CHAT_CONVERSATION:
      // verificar se exist  o chat e o index dele
      const findConversationChat: number = state.conversations.findIndex(
        (conversationState: IConversation) =>
          conversationState?.chat?._id === payload?.chat?._id,
      );

      // se o chat existir atualizar os dados dele
      if (findConversationChat > -1) {
        const conversationsWithChatUpdated: IConversation[] = state.conversations.map(
          (conversationState: IConversation) => {
            if (conversationState?.chat?._id == payload?.chat?._id) {
              conversationState.chat = payload.chat;
            }

            return conversationState;
          },
        );

        return {
          ...state,
          conversations: [...conversationsWithChatUpdated],
        };
      }

      // se o chat nao existir cria-lo e setar nas conversacoes
      const createConversation: IConversation = {
        chat: payload?.chat,
        messages: [],
        text: '',
      };

      // setar nas conversacoes
      const newConversations: IConversation[] = [
        ...state.conversations,
        createConversation,
      ];

      // atualizar estado
      return {
        ...state,
        conversations: newConversations,
      };

    case SET_TEXT_CONVERSATION:
      const conversationsAlterTextByChatId: IConversation[] = state?.conversations?.map(
        (conversationState: IConversation) => {
          if (conversationState?.chat?._id === payload?.chatId) {
            conversationState.text = payload?.text || '';
          }
          return conversationState;
        },
      );

      return {
        ...state,
        conversations: conversationsAlterTextByChatId,
      };

    case SET_MESSAGES_CONVERSATION:
      const conversationsSetMessagesByChatId: IConversation[] = state.conversations.map(
        (conversationState: IConversation) => {
          if (conversationState?.chat?._id == payload?.chatId) {
            conversationState.messages = [...payload?.messages] || [];
          }
          return conversationState;
        },
      );

      return {
        ...state,
        conversations: conversationsSetMessagesByChatId,
      };

    case SET_USER_CHAT_CONVERSATION:
      return {
        ...state,
        userChat: payload?.userChat || null,
      };

    case UPDATE_PROPERTY_USER_CHAT_CONVERSATION:
      if (!state?.userChat) return state;
      if (payload?.userId && state?.userChat?._id !== payload?.userId)
        return state; // so tera essa validacao se o user id tiver sido passado no parametro

      const newUserChat: IPeopleItem = {
        ...state?.userChat,
        [`${payload?.property}`]: payload?.newValue,
      };

      return {
        ...state,
        userChat: {...newUserChat},
      };

    case SET_MESSAGES_SELECTED:
      return {
        ...state,
        messagesSelected: payload?.messages || [],
      };
    case SET_MESSAGES_ATUAL_CONVERSATION:
      let messages = payload?.messages;
      if (typeof payload?.messages == 'function') {
        messages = payload?.messages(state?.messages);
      }
      return {
        ...state,
        messages,
      };
    case SET_CHAT_DATA:
      return {
        ...state,
        chatData: payload.chatData || null,
      };
    case PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL:
      // validar se existe chat setado no chatData, e se o chat e o mesmo do id passado
      if (!state?.chatData || state?.chatData?._id !== payload?.chatId)
        return state;

      const messagesChatAtualUpdatedOnUserSeen: IMessageSchema[] = state?.messages?.map(
        (message: IMessageSchema) => {
          if (
            message?.seenUsers?.indexOf(payload.userId) == -1 &&
            payload.messagesIds.indexOf(message?._id) != -1
          ) {
            message?.seenUsers.push(payload.userId);
          }
          return message;
        },
      );

      return {
        ...state,
        messages: [...messagesChatAtualUpdatedOnUserSeen],
      };
    case INSERT_NEW_MESSAGE_ON_MESSAGES:
      
    // validar se for o usuario do sistema ou se e o chat atual
      if (
        payload?.userId === payload?.user?._id ||
        state?.chatData?._id !== payload?.chatId
      ) return state;

      // setar o status de visto na mensagem
      payload?.globalSocket?.compress(true)?.emit(`set-seen-on-message-chat`, {
        userId: payload?.user?._id,
        chatId: state?.chatData?._id,
        messageId: payload?.messageCreated?._id,
        socketId: payload?.globalSocket?.id,
      });

      return {
        ...state,
        messages: [payload?.messageCreated, ...state.messages] 
      } ;
    case UPDATE_MESSAGES_CHAT_ATUAL:
      
      // validar status da conversasao e verificar se mensagens serao atualizadas
      if (
        state?.chatData?._id !== payload?.chatId || 
        state?.messages?.length <= 0 || 
        payload?.userId === payload?.user?._id
      ) return state;

      // atualizar mensagens
      const messagesUpdated: IMessageSchema[] = state?.messages.map((message: IMessageSchema) => {
        const indexMessageFounded: number = payload?.messages?.findIndex(
          (messageResponse: IMessageSchema) =>
            messageResponse?._id == message?._id,
        );
        // subistituir mensagem
        if (indexMessageFounded > -1) {
          message = payload?.messages[indexMessageFounded];
        }
        return message;
      });

      return {
        ...state,
        messages: [...messagesUpdated]
      };
    default:
      return state;
  }
};

export default conversation;

import {useDispatch, useSelector} from 'react-redux';
import {
  IConversationActionsStore,
  IConversationInitialState,
  ISetConversationAction,
  ISetMessagesConversationAction,
  ISetTextConversationAction,
  ISetUserChatConversationAction,
  IUpdatePropertyUserChatConversationAction,
  SET_CHAT_CONVERSATION,
  SET_MESSAGES_CONVERSATION,
  SET_TEXT_CONVERSATION,
  SET_USER_CHAT_CONVERSATION,
  UPDATE_PROPERTY_USER_CHAT_CONVERSATION,
  IUserChat,
  SET_MESSAGES_SELECTED,
  ISetMessagesSelectedConversationAction,
  ISetMessagesAtualConversationAction,
  SET_MESSAGES_ATUAL_CONVERSATION,
  SET_CHAT_DATA,
  ISetChatDataConversationAction,
  IPutUserOnSeenMessagesByChatAtual,
  PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL,
  IInsertNewMessageOnMessages,
  INSERT_NEW_MESSAGE_ON_MESSAGES,
  UPDATE_MESSAGES_CHAT_ATUAL,
  IUpdateMessagesChatAtual,
} from './types';
import {ICombineReducers} from '../types';
import {IMessageProps} from '../../app/Conversation/components/Center/components/Message/types';
import {IChatSchema} from '../../services/chat/types';
import {IMessageSchema} from '../../services/message/types';
import {ISetIdUserOnSeenMessages, IUser} from '../../types';
import {Socket} from 'socket.io-client';

const Actions = (): IConversationActionsStore => {
  const dispatch = useDispatch();
  const state: IConversationInitialState = useSelector(
    (state: ICombineReducers): IConversationInitialState => state.conversation,
  );

  const setChatConversation = (chat: IChatSchema): void => {
    dispatch<ISetConversationAction>({
      type: SET_CHAT_CONVERSATION,
      payload: {
        chat,
      },
    });
  };

  const setTextConversation = (chatId: string, text: string): void => {
    dispatch<ISetTextConversationAction>({
      type: SET_TEXT_CONVERSATION,
      payload: {
        chatId,
        text,
      },
    });
  };

  const setMessagesConversation = (
    chatId: string,
    messages: IMessageProps[],
  ): void => {
    dispatch<ISetMessagesConversationAction>({
      type: SET_MESSAGES_CONVERSATION,
      payload: {
        chatId,
        messages,
      },
    });
  };

  const setUserChatConversation = (userChat: IUserChat): void => {
    dispatch<ISetUserChatConversationAction>({
      type: SET_USER_CHAT_CONVERSATION,
      payload: {
        userChat,
      },
    });
  };

  const updatePropertyUserChatConversation = (
    property: keyof IUserChat,
    newValue: any,
    userId?: string,
  ): void => {
    dispatch<IUpdatePropertyUserChatConversationAction>({
      type: UPDATE_PROPERTY_USER_CHAT_CONVERSATION,
      payload: {
        property,
        newValue,
        userId,
      },
    });
  };

  const setMessagesSelected = (eventMessages: string[] | any): void => {
    let messages = eventMessages;
    if (typeof eventMessages === 'function') {
      messages = eventMessages(state?.messagesSelected);
    }

    dispatch<ISetMessagesSelectedConversationAction>({
      type: SET_MESSAGES_SELECTED,
      payload: {
        messages,
      },
    });
  };

  const setMessages = (
    eventOrMessages: IMessageProps[] | IMessageSchema[] | any,
  ): void => {
    dispatch<ISetMessagesAtualConversationAction>({
      type: SET_MESSAGES_ATUAL_CONVERSATION,
      payload: {
        messages: eventOrMessages,
      },
    });
  };

  const setChatDataConversation = (chatData: IChatSchema): void => {
    dispatch<ISetChatDataConversationAction>({
      type: SET_CHAT_DATA,
      payload: {
        chatData,
      },
    });
  };

  const putUserOnSeenMessagesByChatAtual = (
    data: ISetIdUserOnSeenMessages,
  ): void => {
    dispatch<IPutUserOnSeenMessagesByChatAtual>({
      type: PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL,
      payload: data,
    });
  };

  const insertNewMessageOnMessages = (
    user: IUser,
    globalSocket: Socket,
    userId: string,
    chatId: string,
    messageCreated: IMessageSchema,
  ): void => {
    dispatch<IInsertNewMessageOnMessages>({
      type: INSERT_NEW_MESSAGE_ON_MESSAGES,
      payload: {
        user,
        globalSocket,
        userId,
        chatId,
        messageCreated,
      },
    });
  };

  const updateMessagesChatAtual = (
    user: IUser,
    userId: string,
    chatId: string,
    messages: IMessageSchema[],
  ): void => {
    dispatch<IUpdateMessagesChatAtual>({
      type: UPDATE_MESSAGES_CHAT_ATUAL,
      payload: {
        user,
        userId,
        chatId,
        messages,
      },
    });
  };

  return {
    state,
    setChatConversation,
    setTextConversation,
    setMessagesConversation,
    setUserChatConversation,
    updatePropertyUserChatConversation,
    setMessagesSelected,
    setMessages,
    setChatDataConversation,
    putUserOnSeenMessagesByChatAtual,
    insertNewMessageOnMessages,
    updateMessagesChatAtual,
  };
};

export default Actions;

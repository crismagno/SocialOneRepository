import { Socket } from "socket.io-client";
import { IMessageProps } from "../../app/Conversation/components/Center/components/Message/types";
import { IChatSchema } from "../../services/chat/types";
import { IMessagesByChat, IMessageSchema } from "../../services/message/types";
import { IChatItem, IPeopleItem, ISetIdUserOnSeenMessages, IUser, IUserMakingActionOnChat } from "../../types";

export const SET_CHAT_CONVERSATION = 'SET_CHAT_CONVERSATION';
export const SET_TEXT_CONVERSATION = 'SET_TEXT_CONVERSATION'; // textInput
export const SET_MESSAGES_CONVERSATION = 'SET_MESSAGES_CONVERSATION'; // todas as mensagens
export const SET_USER_CHAT_CONVERSATION = 'SET_USER_CHAT_CONVERSATION'; // user do chat atual
export const UPDATE_PROPERTY_USER_CHAT_CONVERSATION = 
'UPDATE_PROPERTY_USER_CHAT_CONVERSATION'; // atualizar propriedade do user do chat atual
export const SET_MESSAGES_SELECTED = 'SET_MESSAGES_SELECTED'; // mensagens selecionadas no chat
export const SET_MESSAGES_ATUAL_CONVERSATION = 'SET_MESSAGES_ATUAL_CONVERSATION'; // mensagens do chat atual
export const SET_CHAT_DATA = 'SET_CHAT_DATA'; // configurar o chat atual 
export const PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL = 'PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL'; // configurar o chat atual 
export const INSERT_NEW_MESSAGE_ON_MESSAGES = 'INSERT_NEW_MESSAGE_ON_MESSAGES'; // inserir uma nova mensagem 
export const UPDATE_MESSAGES_CHAT_ATUAL = 'UPDATE_MESSAGES_CHAT_ATUAL'; // atualizar mensagens do chat atual

export interface IUserChat extends IPeopleItem {
    actionChat?: IChatItem["actionChat"];
}


export interface IConversation {
  chat: IChatSchema;
  messages: IMessageProps[];
  text: string; // textInput
  countUnreadMessages?: number;
}

export interface IConversationInitialState {
  conversations: IConversation[];
  userChat: IUserChat;
  messagesSelected: string[];
  messages: Array<IMessageProps | IMessageSchema>;
  chatData: IChatSchema;
};

export interface ISetConversationAction {
    type: typeof SET_CHAT_CONVERSATION;
    payload: {
        chat: IChatSchema;
    };
};

export interface ISetTextConversationAction {
    type: typeof SET_TEXT_CONVERSATION;
    payload: {
        chatId: string;
        text: string;
    };
};

export interface ISetMessagesConversationAction {
    type: typeof SET_MESSAGES_CONVERSATION;
    payload: {
        chatId: string;
        messages: IMessageProps[];
    };
};

export interface ISetUserChatConversationAction {
    type: typeof SET_USER_CHAT_CONVERSATION;
    payload: {
        userChat: IUserChat;
    };
};

export interface IUpdatePropertyUserChatConversationAction {
    type: typeof UPDATE_PROPERTY_USER_CHAT_CONVERSATION;
    payload: {
        property: keyof IUserChat;
        newValue: any;
        userId?: string;
    };
};

export interface ISetMessagesSelectedConversationAction {
    type: typeof SET_MESSAGES_SELECTED;
    payload: {
        messages: string[];
    };
};

export interface ISetMessagesAtualConversationAction {
    type: typeof SET_MESSAGES_ATUAL_CONVERSATION;
    payload: {
        messages: Array<IMessageProps | IMessageSchema>;
    };
};

export interface ISetChatDataConversationAction {
    type: typeof SET_CHAT_DATA;
    payload: {
        chatData: IChatSchema;
    };
};

export interface IPutUserOnSeenMessagesByChatAtual {
    type: typeof PUT_USER_ON_SEEN_MESSAGES_BY_CHAT_ATUAL;
    payload: ISetIdUserOnSeenMessages;
};

export interface IInsertNewMessageOnMessages {
    type: typeof INSERT_NEW_MESSAGE_ON_MESSAGES;
    payload: {
        user: IUser,
        globalSocket: Socket,
        userId: string;
        chatId: string;
        messageCreated: IMessageSchema;
    };
};

export interface IUpdateMessagesChatAtual {
    type: typeof UPDATE_MESSAGES_CHAT_ATUAL;
    payload: {
        user: IUser,
        userId: string;
        chatId: string;
        messages: IMessageSchema[];
    };
}

export type TConversationActions = 
    | ISetConversationAction
    | ISetTextConversationAction
    | ISetMessagesConversationAction
    | ISetUserChatConversationAction
    | IUpdatePropertyUserChatConversationAction
    | ISetMessagesSelectedConversationAction
    | ISetMessagesAtualConversationAction
    | ISetChatDataConversationAction
    | IInsertNewMessageOnMessages
    | IUpdateMessagesChatAtual
    | any;

export interface IConversationActionsStore {
    state: IConversationInitialState;
    setChatConversation: (chat: IChatSchema) => void;
    setTextConversation: (chatId: string, text: string) => void;
    setMessagesConversation: (chatId: string, messages: IMessageProps[]) => void;
    setUserChatConversation: (userChat: IUserChat) => void;
    updatePropertyUserChatConversation: (property: keyof IUserChat, newValue: any, userId?: string) => void;
    setMessagesSelected: (messages: string[] | any) => void;
    setMessages: (eventOrMessages: Array<IMessageProps | IMessageSchema> | any) => void;
    setChatDataConversation: (chatData: IChatSchema) => void;
    putUserOnSeenMessagesByChatAtual: (data: ISetIdUserOnSeenMessages) => void;
    insertNewMessageOnMessages: (user: IUser, globalSocket: Socket, userId: string, chatId: string, messageCreated: IMessageSchema) => void;
    updateMessagesChatAtual: (user: IUser, userId: string, chatId: string, messages: IMessageSchema[]) => void;
};
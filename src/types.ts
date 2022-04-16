import { IMessageSchema } from "./services/message/types";

export type TMessageType = 
   | "text" 
   | "audio" 
   | "document" 
   | "image" 
   | "video" 
   | "figure" 
   |  "microphone";
export type TMessageDelivery = 
    | "send" 
    | "delivered";
export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    phone: string;
    token: string;
    online?: boolean;
    background: {
        home: String;
        people: String;
    }
};
export interface IUserCreate {
    fullName: string;
    email: string;
    phone: string;
    password: string;
};

export type TRoutesAuth = 
    | "SplashInit"
    | "SignIn" 
    | "SignUp" 
    | "VerifyCode";

export type TRoutesApp = 
    | "App"
    | "Home" 
    | "Profile";

export type TRoutesConversation = 
    | "Conversation";
    
export type TRouteRedirect = TRoutesAuth | TRoutesApp | TRoutesConversation;

export type TStepApp = TRoutesAuth | TRoutesApp | TRoutesConversation;


export interface RenderItem<T> {
    item: T;
    index: number; 
};

export interface IPeopleItem {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    online: boolean;
    active?: boolean;
};

export interface IActionChat {
    action: IUserMakingActionOnChat["action"];
    userId: string; 
}

export interface IChatItem {
    _id: string;
    creator: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    users: IUserChat[];
    admin: string[];
    lastMessage: IMessageSchema;
    actionChat: IActionChat;
};

export type TCode = 
    | "VERIFY_CODE" 
    | "CHANGE_EMAIL";

export interface IUserMakingActionOnChat {
    userId: string;
    socketId: string;
    chatId: string;
    isMakingAction: boolean;
    action: "text" | "audio" | "video" | "" | null;
};

export interface IUserChat extends IPeopleItem {
    action?: IUserMakingActionOnChat["action"];
}

export interface ISetIdUserOnSeenMessages {
    userId: string;
    chatId: string;
    messagesIds: string[];
}
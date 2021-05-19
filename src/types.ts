export type TMessageType = "text" | "audio" | "document" | "image" | "video" | "figure" |  "microphone";
export type TMessageDelivery = "send" | "delivered";
export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    phone: string;
    token: string;
};
export interface IUserCreate {
    fullName: string;
    email: string;
    phone: string;
    password: string;
};

export type TRouteRedirect = TRoutesAuth | TRoutesApp;

export type TStepApp = TRoutesAuth | TRoutesApp;

export type TRoutesAuth = 
    "SplashInit" | 
    "SignIn" | 
    "SignUp" | 
    "VerifyCode";

export type TRoutesApp = 
    "App" | 
    "Home" | 
    "Profile";

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
};

export interface IChatItem {
    _id: string;
    creator: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    users: IPeopleItem[];
    admin: string[];
    lastMessage: {
      _id: string;
      chat: string;
      userSent: string;
      value: string;
      createdAt: string | Date;
      updatedAt: string | Date;
      seenUsers: string[];
      type: TMessageType;
      delivery?: TMessageDelivery;
    };
};
import { IChatItem, IPeopleItem } from "../../types";
import { IMessageSchema } from "../message/types";

export interface IResponseDataGetChatByUser {
    message: string;
    chats: IChatItem[];
};

export interface IChatSchema {
    _id: string;
    users: IPeopleItem[];
    creator: string;    
    lastMessage?: IMessageSchema;
    admin: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IChatReturn {
    message: string;
    chat: IChatSchema;
};


import { IChatItem } from "../../../types";

export interface IChatStore {
    chats: IChatItem[];
    searchValue: string;
} 
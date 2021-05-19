import { IChatItem } from "../../../types";
import { IChatStore } from "../../reducers/chat/types";

export interface IActionsChat {
    chatState: IChatStore;
    setChatsOnState: (chats: IChatItem[]) => void;
    addChatsOnState: (chats: IChatItem[]) => void;
    setSearchValue: (searchValue: string) => void;
    updateStatusOnlineOfPerson: (userId: string, status: boolean) => void;
    updateStatusOnlineOfAllPerson: (status: boolean) => void;
};
import { IChatItem } from "../../../../types";
import { TtypeShowEvent } from "../../types";

export interface IConversationTopProps {
    fullName: string;
    avatar: string;
    online: boolean;
    messagesSelected: string[];
    actionChat: IChatItem["actionChat"];
    goBack: () => void;
    showModal: (type: TtypeShowEvent) => void;
    cancelMessagesSelected: () => void;
};
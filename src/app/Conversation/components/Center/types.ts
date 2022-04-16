import { IChatSchema } from "../../../../services/chat/types";
import { IMessageSchema } from "../../../../services/message/types";
import { IMessageProps } from "./components/Message/types";

export interface IConversationCenterProps {
    data: Array<IMessageProps|IMessageSchema>;
    getMoreMessages: () => void;
    setMessageId: (_id: string, type: "insert" | "return") => void;
    messagesSelected: string[];
    loadGetMessages: boolean;
    loadInitial: boolean;
    chatData: IChatSchema;
}
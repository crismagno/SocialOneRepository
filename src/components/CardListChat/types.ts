import { ViewStyle } from "react-native";
import { IChatItem, IUser, IUser, TMessageType } from "../../types";

export interface ICardLlistChatProps {
    style?: ViewStyle;
    colorComponents: string; 
    avatar: string;
    textTitle: string;
    textSubtitle: string;
    animationInitial?: string;
    animationPress?: string;
    animationDuration?: number;
    animationDelay?: number;
    iconButtonRight?: string;
    online?: boolean;
    typeMessage: TMessageType;
    hoursMessage?: String | Date;
    onPressCard: () => void;
    messageIsDisabled?: boolean;
    actionChat: IChatItem['actionChat'];
    statusSendMessage: boolean;
    user: IUser;
    showStatusMessage: boolean;
}
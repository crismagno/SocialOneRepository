import { ViewStyle } from "react-native";
import { TMessageType } from "../../types";

export interface ICardLlistChatProps {
    style?: ViewStyle;
    image: any; 
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
}
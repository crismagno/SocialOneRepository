import { ViewStyle } from "react-native";

export interface ICardLlistPeopleProps {
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
    onPressCard: () => void;
}
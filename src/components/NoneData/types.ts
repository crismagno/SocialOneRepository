import { ViewStyle } from "react-native";
export interface INoneChatProps {
    show: boolean;
    title?: string;
    nameIonicons: string;
    onPress?: () => void;
    style?: ViewStyle;
    colorComponents: string;
};
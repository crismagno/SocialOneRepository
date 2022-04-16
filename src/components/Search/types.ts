import { ViewStyle } from "react-native";
export interface ISearchProps {
    show?: boolean;
    value: string;
    label?: string;
    placeholder?: string;
    setValue: (text: string) => void;
    colorComponents: string;
    style?: ViewStyle;
};
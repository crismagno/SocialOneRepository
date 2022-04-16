import { ViewStyles } from "react-native";
export interface IButtonIconProps {
  show?: boolean;
  style?: ViewStyles;
  nameIcon: string;
  onPress?: () => void;
  colorComponents: string;
  colorIcon: string;
}

import { ViewStyle } from "react-native";
export interface IButtonGradientProps {
  style?: ViewStyle | any;
  colors?: string[];
  label?: string;
  load?: boolean;
  onPress?: () => void;
  toUpperCase?: boolean;
  animationInitial?: any;
  animationClick?: any;
  durationAnimationInitial?: number;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
}

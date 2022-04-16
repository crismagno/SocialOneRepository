import { ViewStyle } from "react-native";
import { ILoadGifProps } from "../LoadGif/types";
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
  loadColor?: string;
  sizeLoad?: number;
  startLinearGradient?: { x: number, y: number };
  endLinearGradient?: { x: number, y: number };
  locationLinearGradient?: number[];
  typeLoad?: ILoadGifProps["type"];
}

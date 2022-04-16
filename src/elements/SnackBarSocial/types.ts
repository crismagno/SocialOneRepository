export type TDurationSnackbarSocial = 
  | "LENGTH_SHORT" 
  | "LENGTH_LONG" 
  | "LENGTH_INDEFINITE";

  export interface ISnackBarSocialDefaultProps {
    text: string;
    textColor?: string;
    textAction?: string;
    colorButton?: string;
    backgroundColor?: string;
    duration?: TDurationSnackbarSocial;
    onPress?: () => void;
  }
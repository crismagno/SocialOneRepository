export interface ICardInfoDescriptionProps {
    iconLeft?: JSX.Element;
    iconRightTitle?: JSX.Element;
    title?: string;
    subtitle?: string;
    description?: string;
    onPress: () => void;
    load?: boolean;
  }
import {ViewStyle} from 'react-native';
import {IChatItem, TMessageType} from '../../types';

export interface ICardLlistChatProps {
  style?: ViewStyle;
  colorComponents: string;
  avatar: string;
  textTitle: string;
  textSubtitle: string;
  animationInitial?: string;
  animationPress?: string;
  animationDuration?: number;
  online?: boolean;
  typeMessage: TMessageType;
  hoursMessage?: String | Date;
  onPressCard: () => void;
  messageIsDisabled?: boolean;
  actionChat: IChatItem['actionChat'];
  statusSendMessage: boolean;
  showStatusMessage: boolean;
}

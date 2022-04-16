import {TChooseRemoveMessages} from '../../types';

export interface IModalRemoveMessagesProps {
  show: boolean;
  onClose: () => void;
  onRemoveMessages: (
    chooseUsersToRemoveMessages: TChooseRemoveMessages,
  ) => void;
  existMessageOthersUsers: boolean;
};

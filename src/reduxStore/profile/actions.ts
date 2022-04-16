import {useDispatch, useSelector} from 'react-redux';

import {ICombineReducers} from '../types';
import {
  IProfileActionsStore,
  IProfileInitialState,
  ISetValuesDragAvatarAction,
  SET_VALUES_DRAG_AVATAR,
  TValuesAvatar,
} from './types';

const Actions = (): IProfileActionsStore => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: ICombineReducers): IProfileInitialState => state.profile,
  );

  const setValuesDragAvatar = (valuesDragAvatar: TValuesAvatar): void => {
    dispatch<ISetValuesDragAvatarAction>({
      type: SET_VALUES_DRAG_AVATAR,
      payload: {
        valuesDragAvatar,
      },
    });
  };

  return {
    state,
    setValuesDragAvatar,
  };
};

export default Actions;

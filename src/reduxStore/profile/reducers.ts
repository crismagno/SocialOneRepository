import {initialState} from './initialState';
import {
  IProfileInitialState,
  SET_VALUES_DRAG_AVATAR,
  TProfileActions,
} from './types';

export const profile = (
  state: IProfileInitialState = initialState,
  action: TProfileActions,
): IProfileInitialState => {
  const {type, payload} = action;

  switch (type) {
    case SET_VALUES_DRAG_AVATAR:
      return {
        ...state,
        valuesDragAvatar: payload?.valuesDragAvatar || null,
      };
    default:
      return state;
  }
};


export default profile;
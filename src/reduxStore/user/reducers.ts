import {initialState} from './initialState';
import {
  IUserInitialState,
  SET_USER,
  SET_USER_PROPERTY,
  TUserActions,
  UPDATE_STATUS_ONLINE,
} from './types';

export const user = (
  state: IUserInitialState = initialState,
  action: TUserActions,
): IUserInitialState => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER:
      return payload?.user || {};
    case UPDATE_STATUS_ONLINE:
      return {
        ...state,
        online: payload?.status || false,
      };
    case SET_USER_PROPERTY:
      return {
        ...state,
        [`${payload?.property}`]: payload?.newValue,
      };
    default:
      return state;
  }
};

export default user;

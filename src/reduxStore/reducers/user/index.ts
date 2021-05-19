import {IActionReducer} from '../types';
import { initialState } from './initialState';
import {IUserStore} from './types';
import {userStore} from './variables';

export const reducer = (
  state: IUserStore = initialState,
  action: IActionReducer,
): IUserStore => {
  const {type, payload} = action;

  switch (type) {
    case userStore.SET_USER:
      return payload;
    case userStore.UPDATE_STATUS_ONLINE:
      return {
        ...state, online: payload
      };
    default:
      return state;
  }
};

export default reducer;
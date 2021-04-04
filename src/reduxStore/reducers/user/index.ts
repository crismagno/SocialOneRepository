import {IActionReducer} from '../types';
import {IUserStore} from './types';
import {userStore} from './variables';

export const initialState: IUserStore = {
  _id: null,
  fullName: null,
  email: null,
  phone: null,
  avatar: null,
  token: null,
};

export const reducer = (
  state: IUserStore = initialState,
  action: IActionReducer,
): IUserStore => {
  const {type, payload} = action;

  switch (type) {
    case userStore.SET_USER:
      return payload;
    default:
      return state;
  }
};

export default reducer;

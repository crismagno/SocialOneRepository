import {IUserInitialState} from './types';

export const initialState: IUserInitialState = {
  _id: null,
  fullName: null,
  email: null,
  phone: null,
  avatar: null,
  token: null,
  online: false,
  background: {
    home: '#0006',
    people: '#0006',
  },
};

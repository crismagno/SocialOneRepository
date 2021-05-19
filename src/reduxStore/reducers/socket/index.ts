import {IActionReducer} from '../types';
import {ISocketStore} from './types';
import variablesSocket from './variables';
import io from 'socket.io-client';
import {StateRequestSocial} from '../../../helpers/request/StateRequestSocial';
import { initialState } from './initialState';

export const reducer = (
  state: ISocketStore = initialState,
  action: IActionReducer,
): ISocketStore => {
  const {type, payload} = action;

  switch (type) {
    case variablesSocket.CONNECT_SOCKET:
      return {
        ...state,
        socket: io(StateRequestSocial.url, {
          transports: ['websocket'],
          forceNew: true,
          reconnectionDelay: 1000,
          reconnection: true
        }),
      };
    case variablesSocket.DISCONNECT_SOCKET:
      return {
        ...state,
        socket: state.socket.disconnect(),
      };
    default:
      return state;
  };
};

export default reducer;

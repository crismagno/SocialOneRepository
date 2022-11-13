import {CONNECT_SOCKET, DISCONNECT_SOCKET, IActionReducer} from './types';
import {ISocketInitialState} from './types';
import io from 'socket.io-client';
import {StateRequestSocial} from '../../helpers/request/StateRequestSocial';
import {initialState} from './initialState';

export const socket = (
  state: ISocketInitialState = initialState,
  action: IActionReducer,
): ISocketInitialState => {
  const {type, payload} = action;

  switch (type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: io(StateRequestSocial.url, {
          transports: ['websocket'],
          forceNew: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 10000,
          reconnection: true,
          multiplex: false,
        }),
      };
    case DISCONNECT_SOCKET:
      return {
        ...state,
        socket: state.socket.disconnect(),
      };
    default:
      return state;
  }
};

export default socket;

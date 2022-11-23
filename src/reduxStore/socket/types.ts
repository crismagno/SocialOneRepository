import {Socket} from 'socket.io-client';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';

export interface ISocketInitialState {
  socket: Socket;
}

export interface IActionReducer {
  type: string;
  payload?: any;
}

export interface ISocketActions {
  state: ISocketInitialState;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

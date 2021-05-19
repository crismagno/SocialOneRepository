import { useDispatch, useSelector } from 'react-redux';
import variablesSocket from './../../reducers/socket/variables';
import {IActionsSocket} from './types';
import {ISocketStore} from "./../../reducers/socket/types"
import { ICombineReducers } from "./../../types";

const ActionsSocket = (): IActionsSocket => {

  const dispatch = useDispatch();
	const socketStateStore: ISocketStore = useSelector((state: ICombineReducers): ISocketStore => state.socket);

  const connectSocket = (): void => {
    dispatch({
      type: variablesSocket.CONNECT_SOCKET,
    });
  };

  const disconnectSocket = (): void => {
    dispatch({
      type: variablesSocket.DISCONNECT_SOCKET,
    });
  };

  return {
    socketStateStore,
    connectSocket,
    disconnectSocket,
  };
};

export default ActionsSocket;

import { useDispatch, useSelector } from 'react-redux';
import variablesSocket from './../../reducers/socket/variables';
import {IActionsSocket} from './types';
import {ISocketStore} from "./../../reducers/socket/types"
const ActionsSocketStore = (): IActionsSocket => {

  const dispatch = useDispatch();
	const socketStateStore = useSelector<any>(state => state.socket) as ISocketStore;

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

export default ActionsSocketStore;

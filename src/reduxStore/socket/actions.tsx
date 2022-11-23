import {useDispatch, useSelector} from 'react-redux';
import {CONNECT_SOCKET, DISCONNECT_SOCKET, ISocketActions} from './types';
import {ISocketInitialState} from './types';
import {ICombineReducers} from '../types';

const ActionsSocket = (): ISocketActions => {
  const dispatch = useDispatch();
  const state: ISocketInitialState = useSelector(
    (state: ICombineReducers): ISocketInitialState => state.socket,
  );

  const connectSocket = (): void => {
    dispatch({
      type: CONNECT_SOCKET,
    });
  };

  const disconnectSocket = (): void => {
    dispatch({
      type: DISCONNECT_SOCKET,
    });
  };

  return {
    state,
    connectSocket,
    disconnectSocket,
  };
};

export default ActionsSocket;

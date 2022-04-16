import {useDispatch, useSelector} from 'react-redux';
import {
  IActionsUserStore,
  ISetUserAction,
  ISetUserPropertyAction,
  IUpdateStatusOnlineAction,
  IUserInitialState,
  SET_USER,
  SET_USER_PROPERTY,
  UPDATE_STATUS_ONLINE,
} from './types';
import {ICombineReducers} from './../types';
import {IUser} from '../../types';

const Actions = (): IActionsUserStore => {
  const dispatch = useDispatch();
  const state: IUserInitialState = useSelector(
    (state: ICombineReducers): IUserInitialState => state.user,
  );

  const setUser = (user: IUser | IUserInitialState): void => {
    dispatch<ISetUserAction>({
      type: SET_USER,
      payload: {
        user,
      },
    });
  };

  const updateStatusOnline = (status: boolean): void => {
    dispatch<IUpdateStatusOnlineAction>({
      type: UPDATE_STATUS_ONLINE,
      payload: {
        status,
      },
    });
  };

  const updateProfileInfo = (
    property: keyof IUser,
    newValue: string | boolean | number,
  ) => {
    dispatch<ISetUserPropertyAction>({
      type: SET_USER_PROPERTY,
      payload: {
        property,
        newValue,
      },
    });
  };

  return {
    state,
    setUser,
    updateStatusOnline,
    updateProfileInfo,
  };
};

export default Actions;

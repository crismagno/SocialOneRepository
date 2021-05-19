import { useDispatch, useSelector } from 'react-redux';
import {IUser} from '../../../types';
import { IUserStore } from '../../reducers/user/types';
import {userStore} from './../../reducers/user/variables';
import {IActionsUser} from './types';
import { ICombineReducers } from "./../../types";

const ActionsUser = (): IActionsUser => {

  const dispatch = useDispatch();
	const userState: IUserStore = useSelector((state: ICombineReducers): IUserStore => state.user);

  const setUserOnState = (user: IUser): void => {
    dispatch({
      type: userStore.SET_USER,
      payload: user,
    });
  };

  const updateStatusOnline = (status: boolean): void => {
    dispatch({
      type: userStore.UPDATE_STATUS_ONLINE,
      payload: status,
    });
  };

  return {
    userState,
    setUserOnState,
    updateStatusOnline
  };
};

export default ActionsUser;

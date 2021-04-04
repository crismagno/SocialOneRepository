import { useDispatch, useSelector } from 'react-redux';
import {IUser} from '../../../types';
import {userStore} from './../../reducers/user/variables';
import {IActionsUser} from './types';

const ActionsUser = (): IActionsUser => {

  const dispatch = useDispatch();
	const userState = useSelector<any>(state => state.user) as IUser;

  const setUserOnState = (user: IUser): void => {
    dispatch({
      type: userStore.SET_USER,
      payload: user,
    });
  };

  return {
    userState,
    setUserOnState,
  };
};

export default ActionsUser;

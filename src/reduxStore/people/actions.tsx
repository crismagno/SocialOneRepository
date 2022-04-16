import {useDispatch, useSelector} from 'react-redux';
import {IPeopleItem} from '../../types';
import {
  ADD_NEW_PEOPLES,
  IAddPeopleAction,
  IPeopleActionsStore,
  IPeopleInitialState,
  ISetPeopleAction,
  ISetSearchValuePeopleAction,
  IUpdateStatusOnlineAllPersonAction,
  IUpdateStatusOnlinePersonAction,
  SET_PEOPLES,
  SET_SEARCH_VALUE_PEOPLE,
  UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE,
  UPDATE_STATUS_ONLINE_PERSON,
} from './types';
import {ICombineReducers} from '../types';

const Actions = (): IPeopleActionsStore => {
  const dispatch = useDispatch();
  const state: IPeopleInitialState = useSelector(
    (state: ICombineReducers): IPeopleInitialState => state.people,
  );

  const setPeople = (people: IPeopleItem[]): void => {
    dispatch<ISetPeopleAction>({
      type: SET_PEOPLES,
      payload: {
        people,
      },
    });
  };

  const addPeople = (people: IPeopleItem[]): void => {
    dispatch<IAddPeopleAction>({
      type: ADD_NEW_PEOPLES,
      payload: {
        people,
      },
    });
  };

  const setSearchValue = (searchValue: string): void => {
    dispatch<ISetSearchValuePeopleAction>({
      type: SET_SEARCH_VALUE_PEOPLE,
      payload: {
        searchValue,
      },
    });
  };

  const updateStatusOnlineOfPerson = (
    userId: string,
    status: boolean,
  ): void => {
    dispatch<IUpdateStatusOnlinePersonAction>({
      type: UPDATE_STATUS_ONLINE_PERSON,
      payload: {
        userId,
        status,
      },
    });
  };

  const updateStatusOnlineOfAllPerson = (status: boolean): void => {
    dispatch<IUpdateStatusOnlineAllPersonAction>({
      type: UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE,
      payload: {
        status,
      },
    });
  };

  return {
    state,
    setPeople,
    addPeople,
    setSearchValue,
    updateStatusOnlineOfPerson,
    updateStatusOnlineOfAllPerson,
  };
};

export default Actions;

import { useDispatch, useSelector } from 'react-redux';
import { IPeopleItem } from '../../../types';
import { IPeopleStore } from '../../reducers/people/types';
import { peopleStore } from './../../reducers/people/variables';
import { IActionsPeople } from './types';
import { ICombineReducers } from "./../../types";

const ActionsUser = (): IActionsPeople => {

  const dispatch = useDispatch();
  const peopleState: IPeopleStore = useSelector((state: ICombineReducers): IPeopleStore => state.people);

  const setPeopleOnState = (people: IPeopleItem[]): void => {
    dispatch({
      type: peopleStore.SET_PEOPLES,
      payload: people,
    });
  };

  const addPeopleOnState = (people: IPeopleItem[]): void => {
    dispatch({
      type: peopleStore.SET_PEOPLES,
      payload: people,
    });
  };

  const setSearchValue = (searchValue: string): void => {
    dispatch({
      type: peopleStore.SET_SEARCH_VALUE_PEOPLE,
      payload: searchValue,
    });
  };

  const updateStatusOnlineOfPerson = (userId: string, status: boolean): void => {
    dispatch({
      type: peopleStore.UPDATE_STATUS_ONLINE_PERSON,
      payload: {
        userId, 
        status
      },
    });
  };

  const updateStatusOnlineOfAllPerson = (status: boolean): void => {
    dispatch({
      type: peopleStore.UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE,
      payload: {
        status
      },
    });
  };
  
  return {
    peopleState,
    setPeopleOnState,
    addPeopleOnState,
    setSearchValue,
    updateStatusOnlineOfPerson,
    updateStatusOnlineOfAllPerson
  };
};

export default ActionsUser;

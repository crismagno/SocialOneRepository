import { IPeopleItem } from '../../../types';
import { IActionReducer } from '../types';
import { initialState } from './initialState';
import { IPeopleStore } from './types';
import { peopleStore } from './variables';

export const reducer = (
  state: IPeopleStore = initialState,
  action: IActionReducer,
): IPeopleStore => {
  const { type, payload } = action;

  switch (type) {
    case peopleStore.SET_PEOPLES:
      return {
        ...state,
        people: payload
      };
    case peopleStore.UPDATE_STATUS_ONLINE_PERSON:

      const newPeopleUpdateStatusOnline: IPeopleItem[] = 
        state.people.map((person: IPeopleItem): IPeopleItem => {
          if (person._id === payload.userId) {
            person.online = payload.status;
          };
          return person;
        })

      return {
        ...state,
        people: newPeopleUpdateStatusOnline
      };
    case peopleStore.UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE:

      const newPeopleUpdateStatusOnlineAll: IPeopleItem[] = 
        state.people.map((person: IPeopleItem): IPeopleItem => {
          person.online = payload.status;
          return person;
        })

      return {
        ...state,
        people: newPeopleUpdateStatusOnlineAll
      };
    case peopleStore.SET_SEARCH_VALUE_PEOPLE:
      return {
        ...state,
        searchValue: payload
      };
    default:
      return state;
  }
};

export default reducer;
import {IPeopleItem} from '../../types';
import {initialState} from './initialState';
import {
  ADD_NEW_PEOPLES,
  IPeopleInitialState,
  SET_PEOPLES,
  SET_SEARCH_VALUE_PEOPLE,
  TPeopleActions,
  UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE,
  UPDATE_STATUS_ONLINE_PERSON,
} from './types';

export const people = (
  state: IPeopleInitialState = initialState,
  action: TPeopleActions,
): IPeopleInitialState => {
  const {type, payload} = action;

  switch (type) {
    case SET_PEOPLES:
      return {
        ...state,
        people: payload?.people || [],
      };
    case ADD_NEW_PEOPLES:
      if (state.searchValue.trim()) return state;
      const newPeople = [...state.people, ...payload?.people];

      return {
        ...state,
        people: newPeople,
      };
    case UPDATE_STATUS_ONLINE_PERSON:
      const newPeopleUpdateStatusOnline: IPeopleItem[] = state.people.map(
        (person: IPeopleItem): IPeopleItem => {
          if (person._id === payload.userId) {
            person.online = payload.status;
          }
          return person;
        },
      );

      return {
        ...state,
        people: newPeopleUpdateStatusOnline,
      };
    case UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE:
      const newPeopleUpdateStatusOnlineAll: IPeopleItem[] = state.people.map(
        (person: IPeopleItem): IPeopleItem => {
          person.online = payload.status;
          return person;
        },
      );

      return {
        ...state,
        people: newPeopleUpdateStatusOnlineAll,
      };
    case SET_SEARCH_VALUE_PEOPLE:
      return {
        ...state,
        searchValue: payload?.searchValue || "",
      };
    default:
      return state;
  }
};

export default people;

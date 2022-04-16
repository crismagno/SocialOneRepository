import {IPeopleItem} from '../../types';

export const SET_PEOPLES = 'SET_PEOPLES';
export const ADD_NEW_PEOPLES = 'ADD_NEW_PEOPLES';
export const SET_SEARCH_VALUE_PEOPLE = 'SET_SEARCH_VALUE_PEOPLE';
export const UPDATE_STATUS_ONLINE_PERSON = 'UPDATE_STATUS_ONLINE_PERSON';
export const UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE = 'UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE';

export interface IPeopleInitialState {
  people: IPeopleItem[];
  searchValue: string;
};

export interface ISetPeopleAction {
  type: typeof SET_PEOPLES;
  payload: {
    people: IPeopleItem[];
  };
};

export interface IAddPeopleAction {
  type: typeof ADD_NEW_PEOPLES;
  payload: {
    people: IPeopleItem[];
  };
};

export interface ISetSearchValuePeopleAction {
    type: typeof SET_SEARCH_VALUE_PEOPLE;
    payload: {
        searchValue: string;
    };
};

export interface IUpdateStatusOnlinePersonAction {
    type: typeof UPDATE_STATUS_ONLINE_PERSON;
    payload: {
        userId: string;
        status: boolean;
    };
};

export interface IUpdateStatusOnlineAllPersonAction {
    type: typeof UPDATE_STATUS_ONLINE_ALL_PERSON_PEOPLE;
    payload: {
        status: boolean;
    };
};

export type TPeopleActions = 
    | ISetPeopleAction
    | IAddPeopleAction
    | ISetSearchValuePeopleAction
    | IUpdateStatusOnlinePersonAction
    | IUpdateStatusOnlineAllPersonAction
    | any;

export interface IPeopleActionsStore {
    state: IPeopleInitialState;
    setPeople: (people: IPeopleItem[]) => void;
    addPeople: (people: IPeopleItem[]) => void;
    setSearchValue: (searchValue: string) => void;
    updateStatusOnlineOfPerson: (userId: string, status: boolean) => void;
    updateStatusOnlineOfAllPerson: (status: boolean) => void;
}

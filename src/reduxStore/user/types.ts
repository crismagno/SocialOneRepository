import { IUser } from "../../types";
export const SET_USER = "SET_USER";
export const UPDATE_STATUS_ONLINE = "UPDATE_STATUS_ONLINE";
export const SET_USER_PROPERTY = "SET_USER_PROPERTY";

export interface IUserInitialState extends IUser {
    online: boolean
}

export interface ISetUserAction {
    type: typeof SET_USER;
    payload: {
      user: IUser | IUserInitialState;
    };
}

export interface IUpdateStatusOnlineAction {
    type: typeof UPDATE_STATUS_ONLINE;
    payload: {
      status: boolean;
    };
}

export interface ISetUserPropertyAction {
    type: typeof SET_USER_PROPERTY;
    payload: {
      property: keyof IUser;
      newValue: string | boolean | number;
    };
}
  
  export type TUserActions =
    | ISetUserAction
    | IUpdateStatusOnlineAction
    | ISetUserPropertyAction
    | any;

export interface IActionsUserStore {
    state: IUserInitialState;
    setUser: (user: IUser | IUserInitialState) => void;
    updateStatusOnline: (status: boolean) => void;
    updateProfileInfo: (property: keyof IUser, newValue: string | boolean | number) => void;
};
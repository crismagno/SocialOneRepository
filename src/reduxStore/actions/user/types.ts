import { Reducer, ReducerState } from "react";
import { IUser } from "../../../types";

export interface IActionsUser {
    userState: ReducerState<Reducer<any, any>>;
    setUserOnState: (user: IUser) => void;
};
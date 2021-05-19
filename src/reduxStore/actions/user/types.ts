import { IUser } from "../../../types";
import { IUserStore } from "../../reducers/user/types";

export interface IActionsUser {
    userState: IUserStore;
    setUserOnState: (user: IUser) => void;
    updateStatusOnline: (status: boolean) => void;
};
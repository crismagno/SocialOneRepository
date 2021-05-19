import { IUserStore } from "./types";

export const initialState: IUserStore = {
    _id: null,
    fullName: null,
    email: null,
    phone: null,
    avatar: null,
    token: null,
    online: false,
};
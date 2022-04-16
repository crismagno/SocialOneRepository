import { IUserInitialState } from "./types";
import { images } from "./../../assets/general";

export const initialState: IUserInitialState = {
    _id: null,
    fullName: null,
    email: null,
    phone: null,
    avatar: null,
    token: null,
    online: false,
    background: {
        home: images.wallpapers[3],
        people: images.wallpapers[4]
    }
};
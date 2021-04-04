import { combineReducers } from "redux";

import user from '../reducers/user/index';
import socket from '../reducers/socket/index';

export default combineReducers({
    user,
    socket,
});
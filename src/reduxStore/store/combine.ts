import { combineReducers } from "redux";
import { ICombineReducers } from "./../types";
import user from '../reducers/user/index';
import socket from '../reducers/socket/index';
import people from '../reducers/people/index';
import chats from '../reducers/chat/index';

export default combineReducers<ICombineReducers>({
    user,
    socket,
    people,
    chats
});
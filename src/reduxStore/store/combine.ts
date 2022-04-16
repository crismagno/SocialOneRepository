import { combineReducers } from "redux";
import { ICombineReducers } from "./../types";
import { user } from './../user/reducers';
import { socket } from './../socket/reducers';
import { profile } from './../profile/reducers';
import { people } from './../people/reducers';
import { chats } from './../chat/reducers';
import { conversation } from './../conversation/reducers';

export default combineReducers<ICombineReducers>({
    user,
    socket,
    people,
    chats,
    profile,
    conversation
});
import { Reducer, ReducerState } from "react";

export interface IActionsSocket {
    socketStateStore: ReducerState<Reducer<any, any>>;
    connectSocket: () => void;
    disconnectSocket: () => void;
};
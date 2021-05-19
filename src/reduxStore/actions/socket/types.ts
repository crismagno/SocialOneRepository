import { ISocketStore } from "../../reducers/socket/types";

export interface IActionsSocket {
    socketStateStore: ISocketStore;
    connectSocket: () => void;
    disconnectSocket: () => void;
};
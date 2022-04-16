import { IUserCreate } from "../../../../types";

export interface ISignUpCenterProps {
    user: IUserCreate;
    setUser: (user: IUserCreate) => void;
    inputsError: IUserCreate;
    setInputsError: (user) => void;
    onSubmit: () => void;
};
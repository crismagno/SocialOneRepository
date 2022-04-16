import { IUserSignIn } from "../../../../services/user/types";

export interface ISignInCenterProps {
    user: IUserSignIn;
    setUser: (user: IUserSignIn) => void;
    inputsError: IUserSignIn;
    setInputsError: (user: IUserSignIn) => void;
    onSubmit: () => void;
};
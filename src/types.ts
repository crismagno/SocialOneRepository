export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    phone: string;
    token: string;
};
export interface IUserCreate {
    fullName: string;
    email: string;
    phone: string;
    password: string;
};
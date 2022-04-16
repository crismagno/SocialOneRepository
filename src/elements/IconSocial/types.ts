export interface IIconProps {
    name: keyof IIcons;
    size: number;
    color: string;
};

export interface IIcons {
    person: JSX.Element;
    personOutline: JSX.Element;
};

export interface IIconParams {
    size: number;
    color: string;
};

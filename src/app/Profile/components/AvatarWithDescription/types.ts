import { IUser } from "../../../../types";

export interface IAvatarWithDescriptionProps {
    onChooseAvatar: () => void;
    onChooseAvatarCamera: () => void;
    onConfirmChangeAvatar: () => void;
    cancelImage: () => void;
    imageAvatar: any;
    imageAvatarLoad?: boolean;
    user: IUser;
  }
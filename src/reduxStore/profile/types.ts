export const SET_VALUES_DRAG_AVATAR = 'SET_VALUES_DRAG_AVATAR';

export type TValuesAvatar = {x: number; y: number};

export interface IProfileInitialState {
  valuesDragAvatar: TValuesAvatar | null;
}

export interface ISetValuesDragAvatarAction {
  type: typeof SET_VALUES_DRAG_AVATAR;
  payload: {
    valuesDragAvatar: TValuesAvatar;
  };
}

export type TProfileActions = ISetValuesDragAvatarAction;

export interface IProfileActionsStore {
  state: IProfileInitialState;
  setValuesDragAvatar: (values: TValuesAvatar) => void;
}

export interface IAnimatableWrapperProps {
    show: boolean;
    showAnimation: string;
    hideAnimation: string;
    delayShowAnimation?: number;
    delayHideAnimation?: number;
    durationShowAnimation?: number;
    durationHideAnimation?: number;
    style?: string;
    children?: any
}
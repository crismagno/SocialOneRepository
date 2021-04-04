import TinyToast from 'react-native-tiny-toast';
import { colorsSocial } from '../../assets/general/colors';
import { setSize } from "../../helpers/responsive/Index";
import { IToastSocial } from './types';

export const ToastSocial = (params: IToastSocial): void => {

    const colorsToast = {
        success: "green",
        danger: "red",
        warning: "yellow",
        info: "blue",
    };

    TinyToast.show(params.message, {
        position: TinyToast.position.BOTTOM,
        containerStyle:{
            backgroundColor: colorsToast[params.type ?? "success"],
            borderRadius: setSize(5),
            height: setSize(50),
            width: setSize(300),
        },
        textStyle: {
            color: colorsSocial.colorA1,
            fontSize: setSize(17)
        },
        imgStyle: {},
        mask: false,
        maskStyle: {},
        duration: params.duration ?? 2000,
        animation: true,
    });
};

export const Toast = (text: string = "", duration: number = 2000, error: boolean = false) => {
    TinyToast.show(text, {
        position: TinyToast.position.BOTTOM,
        containerStyle:{
            backgroundColor: error ? colorsSocial.colorA3 : colorsSocial.colorA4,
            borderRadius: setSize(5),
            height: setSize(50),
            width: setSize(300),
        },
        textStyle: {
            color: colorsSocial.colorA1,
            fontSize: setSize(17)
        },
        imgStyle: {},
        mask: false,
        maskStyle: {},
        duration: duration,
        animation: true,
    });
};
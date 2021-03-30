import TinyToast from 'react-native-tiny-toast';
import { setSize } from "../../helpers/responsive/Index";

export const Toast = (text: string = "", duration: number = 2000, error: boolean = false) => {
    TinyToast.show(text, {
        position: TinyToast.position.BOTTOM,
        containerStyle:{
            backgroundColor: error ? "red" : "#9584ff",
            borderRadius: setSize(15)
        },
        textStyle: {
            color: "#FFF",
            fontSize: setSize(14)
        },
        imgStyle: {},
        mask: false,
        maskStyle: {},
        duration: duration,
        animation: true,
    });
};
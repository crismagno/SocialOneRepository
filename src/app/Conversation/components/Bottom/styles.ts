import { Dimensions, StyleSheet } from "react-native";
import { colorsSocial } from "../../../../assets/general";
import { setSize } from "../../../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerBottomKeyboard: (isKeyboardOpen: boolean): any => ({
        flex: 1,
    }),
    containerSend: (isKeyboardOpen: boolean) => ({        
        flexDirection: "row",
        alignItems: "flex-end",
        minHeight: setSize(40),
        maxHeight: setSize(200),
        paddingVertical: setSize(5),
        paddingHorizontal: setSize(10),
    }),
    inputSendMessage: (isFocused: boolean, hasText: boolean) => ({
        flex: 1,
        borderWidth: setSize(0.5),
        minHeight: setSize(35),
        maxHeight: setSize(100),
        paddingVertical: setSize(isFocused ? 6 : 5),
        paddingHorizontal: setSize(45),
        borderRadius: setSize(isFocused ? 300 : 0),
        marginRight: setSize(isFocused || hasText ? 7 : 0),
        borderColor: isFocused ? colorsSocial.colorA4 : colorsSocial.colorA9,
        elevation: isFocused ? 2 : 1,
        backgroundColor: colorsSocial.colorA1,
        color: isFocused ? colorsSocial.colorA9 : "#dfdfdf",
        marginBottom: setSize(isFocused ? 0 : 1),
    }),
    buttonSend: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorsSocial.colorA4,
        width: setSize(43),
        height: setSize(43),
        borderRadius: setSize(25),
        elevation: 2,
    }
});

export default styles;
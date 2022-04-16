import { StyleSheet, Dimensions, ViewStyle } from "react-native";
import { colorsSocial } from "../../../../assets/general";
import { setSize } from "../../../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: '#0009',
        alignItems: "center",
        justifyContent: "flex-end",
    },
    containerButton: (isShowKeyboard: boolean): ViewStyle => ({
        flex: 1,
        width: WIDTH,
        bottom: isShowKeyboard ? setSize(79) : setSize(50),
    }),
    containerKeyboard: {
    },
    boxModal: (isShowKeyboard: boolean): ViewStyle => ({
        borderTopRightRadius: setSize(10),
        borderTopLeftRadius: setSize(10),
        minHeight: setSize(100),
        width: WIDTH,
        backgroundColor: '#FFF',
        zIndex: 10000,
        elevation: 1000,
        padding: setSize(15),
        bottom: isShowKeyboard ? setSize(79) : setSize(50),
    }),
    textTitle: {
        marginLeft: setSize(10),
        fontSize: setSize(16),
        fontWeight: "700",
        color: colorsSocial.colorA4
    },
    input: {
        height: setSize(50),
        backgroundColor: colorsSocial.colorA1,
        fontSize: setSize(14),
    },
    containerBottom: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: setSize(2),
        marginTop: setSize(10)
    },
    buttonBottom: {
        marginHorizontal: setSize(10),
        padding: setSize(4)
    },
    textButton: {
        fontSize: setSize(13),
        fontWeight: "700",
        color: colorsSocial.colorA4
    }
});

export default styles;
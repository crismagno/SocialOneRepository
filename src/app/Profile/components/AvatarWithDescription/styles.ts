import { StyleSheet, ViewStyle, Dimensions } from "react-native";
import { colorsSocial } from "../../../../assets/general";
import { setSize } from "../../../../helpers/responsive/Index";

const SIZE_IMAGE = 190;
const styles = StyleSheet.create({
    container: (isOnline: boolean) => {
        return {
            width: "100%",
            height: setSize(320),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colorsSocial.colorA4,
            zIndex: 10,
            overflow: "hidden"
        }
    },
    containerImageBackground: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: setSize(SIZE_IMAGE),
    },
    containerImageBackgroundButton: {
        justifyContent: "center",
        alignItems: "center",
        height: setSize(SIZE_IMAGE),
        width: setSize(SIZE_IMAGE),
        borderRadius: setSize(SIZE_IMAGE),
        borderWidth: setSize(1),
        borderColor: colorsSocial.colorA1,
        elevation: 5,
    },
    viewOnline: (isOnline: boolean, borderColor: string): ViewStyle => {
        const backgroundColor = isOnline ? "#65ec99" : "#d2d6d4";
        return {
            position: "absolute",
            right: setSize(SIZE_IMAGE/6.9),
            bottom: setSize(SIZE_IMAGE/20),
            width: setSize(SIZE_IMAGE/10),
            height: setSize(SIZE_IMAGE/10),
            borderRadius: setSize(SIZE_IMAGE/10),
            backgroundColor,
            borderColor,
            borderWidth: setSize(1),

        }
    },
    buttonConfirm: {
        position: "absolute", 
        left: setSize(155), 
        bottom: setSize(20), 
        borderWidth: setSize(1), 
        borderColor: colorsSocial.colorA1,
        width: setSize(35),
        height: setSize(35),
        borderRadius: setSize(5),
        elevation: 3
    },
    buttonClose: {
        position: "absolute", 
        right: setSize(165), 
        bottom: setSize(20), 
        borderWidth: setSize(1), 
        width: setSize(35),
        height: setSize(35),
        borderRadius: setSize(5),
        borderColor: colorsSocial.colorA1,
        elevation: 3
      }
});

export default styles;
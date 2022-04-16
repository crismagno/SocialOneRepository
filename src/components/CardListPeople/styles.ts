import { StyleSheet, ViewStyle } from "react-native";
import { colorsSocial } from "../../assets/general";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    cardListChat: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        height: setSize(70),
        width: "100%",
        borderRadius: setSize(10),
        backgroundColor: "#FFF4",
        marginBottom: setSize(7),
        padding: setSize(5)
    },
    containerImage: {
        position: "relative",
    },
    avatar: {
        width: setSize(60),
        height: setSize(60),
        borderRadius: setSize(8),
        marginRight: setSize(5)
    },
    boxOfListCenter: {
        height: "100%",
        width: "60%"
    },
    textNameChat: (color: string): ViewStyle => ({
        color,
        fontWeight: "bold",
        fontSize: setSize(15)
    }),
    containerLastMessage: {
        flexDirection: "row",
        alignItems: "center",
        width: "75%"
    },
    textLastMessage: (color: string): ViewStyle => ({
        color,
        fontSize: setSize(13)
    }),
    cardListChatEnd: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flex: 1
    },
    buttonRight: {
        justifyContent: "center",
        alignItems: "center",
        width: setSize(50),
        height: setSize(50),
    },
    viewOnline: (isOnline: boolean, borderColor: string): ViewStyle => {
        const backgroundColor = isOnline ? "#65ec99" : "gray";
        return {
            position: "absolute",
            right: setSize(7),
            bottom: setSize(3),
            width: setSize(10),
            height: setSize(10),
            borderRadius: setSize(10),
            backgroundColor,
            borderColor,
            borderWidth: setSize(0.5),
        }
    }

});

export default styles;
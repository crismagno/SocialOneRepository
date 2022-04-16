import { StyleSheet, TextStyle } from "react-native";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: (colorText: string): TextStyle => ({
        color: colorText,
        fontSize: setSize(14)
    }),
    containerButton: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;
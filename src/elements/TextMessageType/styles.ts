import { StyleSheet, ViewStyle } from "react-native";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    textLastMessage: (color: string): ViewStyle => ({
        color: color,
        fontSize: setSize(12)
    })
});

export default styles;
import { Dimensions, StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";
import { colorsSocial } from "../../assets/general/colors";

const { height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEIGHT,
        width: "100%",
        padding: setSize(30),
        justifyContent: "center",
        backgroundColor: colorsSocial.colorA1
    },
});

export default styles;
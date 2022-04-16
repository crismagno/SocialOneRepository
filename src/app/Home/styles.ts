import { Dimensions, StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";
import { colorsSocial } from "./../../assets/general/colors";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        height: HEIGHT - setSize(49),
        width: "100%",
        backgroundColor: colorsSocial.colorA1,
        overflow: "hidden"
    },
});

export default styles;
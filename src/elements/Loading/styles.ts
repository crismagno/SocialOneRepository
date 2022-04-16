import { StyleSheet, Dimensions } from "react-native";
import { colorsSocial } from "../../assets/general";
import { setSize } from "../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0005",
        position: "absolute",
        left: setSize(0),
        top: setSize(0),
        width: WIDTH,
        height: HEIGHT,
        zIndex: 10000000000,
        elevation: 2
    },
    containerInto: {
        backgroundColor: "#29292999",
        height: setSize(100),
        width: setSize(100),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: setSize(7),
        overflow: "hidden"
    },
    textDescription: {
        color: colorsSocial.colorA1,
        marginTop: setSize(10)
    }
});

export default styles;
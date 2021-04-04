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
    containerLogo: {
        alignItems: "center"
    },
    containerInputs: {
        justifyContent: "center"
    },
    input: {
        backgroundColor: colorsSocial.colorA1,
        marginTop: setSize(10)
    },
    textCreate: {
        color: colorsSocial.colorA1
    },
    buttonCreate: {
        marginTop: setSize(15)
    },
    buttonSignIn: {
        marginTop: setSize(5)
    },
    textRequired: {
        color: colorsSocial.colorA3,
        fontSize: setSize(14),
        marginLeft: setSize(5),
        marginTop: setSize(3)
    }
});

export default styles;
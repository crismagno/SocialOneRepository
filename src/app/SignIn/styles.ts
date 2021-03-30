import { Dimensions, StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";
import Colors from "./../../assets/general/colors";

const { height: HEIGHT } = Dimensions.get("window");
const { signIn: { colors } } = Colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEIGHT,
        width: "100%",
        padding: setSize(30),
        justifyContent: "center",
        backgroundColor: colors[0]
    },
    containerLogo: {
        alignItems: "center"
    },
    containerInputs: {
        justifyContent: "center"
    },
    input: {
        backgroundColor: colors[0],
        marginTop: setSize(10)
    },
    buttonSignIn: {
        marginTop: setSize(15)
    },
    buttonSignUp: {
        marginTop: setSize(5)
    },
    textCreate: {
        color: "#FFF"
    },
    textRequired: {
        color: "red",
        fontSize: setSize(14),
        marginLeft: setSize(5),
        marginTop: setSize(3)
    }
});

export default styles;
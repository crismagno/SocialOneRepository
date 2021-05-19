import { StyleSheet } from "react-native";
import { setSize } from "../../../../helpers/responsive/Index";
import { colorsSocial } from "../../../../assets/general/colors";

const styles = StyleSheet.create({
    input: {
        height: setSize(50),
        backgroundColor: colorsSocial.colorA1,
        marginTop: setSize(10)
    },
    textRequired: {
        color: colorsSocial.colorA3,
        fontSize: setSize(14),
        marginLeft: setSize(5),
        marginTop: setSize(3)
    }
});

export default styles;
import { StyleSheet } from "react-native";
import Colors from "../../assets/general/colors";
import { setSize } from "../../helpers/responsive/Index";

const { splashInit: { colors } } = Colors; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[0]
    }
});

export default styles;
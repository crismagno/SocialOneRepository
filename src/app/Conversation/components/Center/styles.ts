import { Dimensions, StyleSheet } from "react-native";
import { setSize } from "../../../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
    },
    containerList: {},
    containerListStyle: {
        paddingVertical: setSize(5),
     },

});

export default styles;
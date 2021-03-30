import { StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    logo: (width: number = 170): Object => ({
        width: setSize(width),
        height: setSize(width),
    })
});

export default styles;
import { StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    logo: (width: number = 170, height: number = 170): any => ({
        width: setSize(width),
        height: setSize(height),
    })
});

export default styles;
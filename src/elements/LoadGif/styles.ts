import { StyleSheet } from "react-native";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    load: (size: number = 30): any => ({
        width: setSize(size),
        height: setSize(size),
    })
});

export default styles;
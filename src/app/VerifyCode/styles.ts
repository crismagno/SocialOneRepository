import { StyleSheet } from "react-native";
import { colorsSocial } from "../../assets/general/colors";
import { setSize } from "../../helpers/responsive/Index";

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: colorsSocial.colorA1
    },
    containerTop: {
        height: setSize(50),
        width: "100%",
        justifyContent: "center",
    },
    containerCenter: {
        marginTop: setSize(170),
        marginBottom: setSize(40),
        justifyContent: "center",
        alignItems: "center",
    },
    containerBottom: {
        padding: setSize(20)
    },
    buttonVerify: {
        marginBottom: setSize(5)
    },
    viewInputsCode: {
        flexDirection: "row",
        marginTop: setSize(10)
    },
    inputCode: {
        width: setSize(45),
        height: setSize(70),
        marginHorizontal: setSize(8),
        textAlign: "center",
        fontSize: setSize(22),
        color: colorsSocial.colorA3,
        fontWeight: "bold",

    },
    imageTop: { 
        position: "absolute",
        width: setSize(400), 
        height: setSize(400),
        left: setSize(-80),
        top: setSize(-170)    
    },
    imageBottom: { 
        position: "absolute",
        width: setSize(300), 
        height: setSize(300),
        right: setSize(-40),
        top: setSize(650)    
    },
    buttonTopLeft: { 
        width: setSize(100), 
        marginLeft: setSize(5),
    },
    textSend: {
        fontSize: setSize(30),
        marginBottom: setSize(30),
        color: colorsSocial.colorA3,
        fontWeight: "bold"
    },
    viewInformation: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: setSize(50)
    },
    textUserInfo: {
        width: setSize(260),
        fontSize: setSize(15),
        color: colorsSocial.colorA4,
        fontWeight: "bold",
        marginBottom: setSize(5),
        textAlign: "center"
    },
    textInfo: {
        width: setSize(220),
        fontSize: setSize(14),
        color: colorsSocial.colorA3,
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default styles;
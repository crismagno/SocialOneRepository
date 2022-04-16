import { Dimensions, StyleSheet } from "react-native";
import { colorsSocial } from "../../../../../../../../assets/general";
import { setSize } from "../../../../../../../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    bubble: (isUserApplication: boolean, scale: number) => ({
        container: {
            borderRadius: setSize(5),
            maxWidth: setSize(320),
            // marginBottom: setSize(2),
            // marginVertical: setSize(scale !== 1 ? scale*9 : 1),
            // marginVertical: setSize(0),
            elevation: 2,
            // transform: [
            //     { scale },
            //     { translateX: scale !== 1 ? (isUserApplication ? -(scale*17) : +(scale*17)) : 0 }
            // ],
        },
        bubbleContent: {
            paddingHorizontal: setSize(4)
        },
        bubbleBottom: {
            // borderWidth: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: setSize(4),
            paddingBottom: setSize(3)
        },
        textDate: {
            fontSize: setSize(10),
            color: colorsSocial.colorA1
        },
        bubbleContentText: {
            color: colorsSocial.colorA1,
            fontSize: setSize(13),
        },
        bubbleContentRemoved: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            opacity: 0.7,
            padding: setSize(7)
        },
        bubbleContentTextRemoved: {
            color: colorsSocial.colorA1,
            fontSize: setSize(13),
        },
        bubbleContentIconRemoved: {
            color: colorsSocial.colorA1,
            fontSize: setSize(13),
            marginRight: setSize(5)
        },
        contentCheckSend: {
            marginLeft: setSize(3)
        }, 
        bubbleBottomSub: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: setSize(4),
            paddingBottom: setSize(3)
        }
    }),
});

export default styles;
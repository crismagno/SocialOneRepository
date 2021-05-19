import React from "react";
import { View, Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { setSize } from "../../helpers/responsive/Index";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const Loading: React.FC = (props): JSX.Element => {
    return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0003",
        position: "absolute",
        left: setSize(0),
        top: setSize(0),
        width: WIDTH,
        height: HEIGHT,
        zIndex: 10000
    }}>
        <Animatable.View 
            animation={"fadeIn"}
            style={{
                backgroundColor: "#29292999",
                height: setSize(100),
                width: setSize(100),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: setSize(7),
            }}>
            <Animatable.View
                animation={"rotate"}
                duration={1500}
                easing="ease-in-out"
                iterationCount="infinite">
                <AntDesign 
                    name={"loading1"}
                    size={setSize(17)}
                    color={"#FFF"}
                />
            </Animatable.View>
        </Animatable.View>
    </View>
};

export default Loading;
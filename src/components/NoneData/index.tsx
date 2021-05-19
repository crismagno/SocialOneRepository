import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorImageIsLight } from "../../helpers/global";
import { setSize } from "../../helpers/responsive/Index";
import * as Animatable from "react-native-animatable";

export interface INoneChatProps {
    image: string;
    title: string;
    nameIonicons: string;
    onPress?: () => void;
};

const NoneChat: React.FC<INoneChatProps> = (props): JSX.Element => {

    const [colorText, setColorText] = useState("#FFF");
    
    useEffect(() => {
        colorTextByImage();
    }, [props.image]);

    // change color of text fo card by image color dominant
    const colorTextByImage = async (): Promise<void> => {
        const colorIsLight = await colorImageIsLight(props.image)
        if (colorIsLight) {
            setColorText("#313131");
            return;
        }
        if (!colorIsLight) {
            setColorText("#FFF");
            return;
        };
    };
    
    return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Animatable.View
            animation={"fadeIn"}
            duration={1000}>
            <TouchableOpacity
                onPress={() => props?.onPress()}>
                <Ionicons 
                    name={props.nameIonicons} 
                    size={setSize(60)}
                    color={colorText}
                />
                <Text style={{
                    color: colorText,
                    fontSize: setSize(14)
                }}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </Animatable.View>

    </View>
};

export default NoneChat;
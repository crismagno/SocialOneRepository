import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setSize } from "../../helpers/responsive/Index";
import styles from "./styles";
import { INoneChatProps } from "./types";
import If from "../../elements/If";
import * as Animatable from "react-native-animatable"

export const NoneChat: React.FC<INoneChatProps> = (props): JSX.Element => {
    return <If condition={props?.show}>
        <View style={[styles.container, props.style]}>
            <TouchableOpacity
                style={styles.containerButton}
                onPress={() => props?.onPress && props?.onPress()}>
                    <Animatable.View 
                        animation={"tada"}
                        duration={2000}
                        easing="ease-out" 
                        iterationCount="infinite"
                        iterationDelay={5000}
                    >
                        <Ionicons 
                            name={props.nameIonicons} 
                            size={setSize(60)}
                            color={props?.colorComponents}
                        />
                    </Animatable.View>
                <Text style={styles.textTitle(props?.colorComponents)}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    </If>
};

export default memo(NoneChat);
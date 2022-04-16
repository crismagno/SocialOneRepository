import React from "react"
import { View } from "react-native";
import If from "../If";
import LoadCircle from '../LoadCircle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setSize } from "../../helpers/responsive/Index";
import { colorsSocial } from "../../assets/general";
import { IStatusSendMessage } from "./types";

export const StatusSendMessage: React.FC<IStatusSendMessage> = (props): JSX.Element => {
    return (
        <View>
            <If condition={!props.statusSendMessage}>
                <Ionicons
                    name={'md-checkmark-sharp'}
                    size={setSize(15)}
                    color={colorsSocial.colorA1}
                />
            </If>
            <If condition={props.statusSendMessage}>
                <Ionicons
                    name={'md-checkmark-done'}
                    size={setSize(15)}
                    color={colorsSocial.colorA8}
                />
            </If>
        </View>
    )
}

export default StatusSendMessage;
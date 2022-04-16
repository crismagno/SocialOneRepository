import React, { memo, useEffect,  useRef,  useState } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import { setSize } from "./../../helpers/responsive/Index";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ICardLlistPeopleProps } from "./types";
import If from "./../../elements/If";
import { getFileByPath } from "../../helpers/files";
import { images } from "../../assets/general";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const CardListPeople: React.FC<ICardLlistPeopleProps> = (props): JSX.Element => {

    useEffect(() => {
        if (props.animationInitial) {
            animationButtonRef.current?.animate(props.animationInitial, props.animationDuration || 500);
        }
    }, []);

    useEffect(() => {
        setAvatar(props?.avatar ? { uri: getFileByPath(props?.avatar) } : images.avatars[0])
    }, [props?.avatar]);

    const colorText = props?.colorComponents;
    const animationButtonRef = useRef(null);
    const [avatar, setAvatar] = useState(props?.avatar ? { uri: getFileByPath(props?.avatar) } : images.avatars[0]);

    const onPressCard = async (): Promise<void> => {
        if (props.animationPress) {
            await animationButtonRef.current?.animate(props.animationPress, 150)
        }
        props?.onPressCard();
    };

    const onErrorAvatar = (error: any): void => {
        if (error) setAvatar(images.avatars[0]);
    };

    return <Animatable.View
        ref={animationButtonRef}>
        <AnimatedTouchableOpacity 
            onPress={() => onPressCard()}
            activeOpacity={0.9}
            style={[
                styles.cardListChat,
                props.style
            ]}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.containerImage}
            >     
                <Image
                    style={styles.avatar}
                    source={avatar}
                    onError={onErrorAvatar}
                />
                <If condition={props.online !== undefined &&  props.online !== null}>
                    <Animatable.View
                        style={styles.viewOnline(props.online, colorText)} 
                    ></Animatable.View>
                </If>
            </TouchableOpacity>
            <View style={styles.boxOfListCenter}>
                <If condition={!!props.textTitle}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        >
                        <Text
                            style={styles.textNameChat(colorText)}
                            numberOfLines={1}>
                            {props.textTitle}
                        </Text>
                    </TouchableOpacity>
                </If>
                <If condition={!!props.textSubtitle}>
                    <TouchableOpacity
                        style={styles.containerLastMessage}>
                        <Text
                            style={styles.textLastMessage(colorText)}
                            numberOfLines={1}>
                            {props.textSubtitle}
                        </Text> 
                    </TouchableOpacity>
                </If>
            </View>
            <View style={styles.cardListChatEnd}>
                <If condition={!!props.iconButtonRight}>
                    <AnimatedTouchableOpacity 
                        activeOpacity={0.7}
                        onPress={() => onPressCard()}
                        style={styles.buttonRight}>
                        <Ionicons 
                            name={props.iconButtonRight}
                            color={colorText}
                            size={setSize(25)}
                        />
                    </AnimatedTouchableOpacity>
                </If>
            </View>
        </AnimatedTouchableOpacity>
    </Animatable.View>;
};

export default memo(CardListPeople);
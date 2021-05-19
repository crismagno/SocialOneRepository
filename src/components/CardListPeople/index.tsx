import React, { useEffect,  useRef,  useState } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import { setSize } from "./../../helpers/responsive/Index";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ICardLlistPeopleProps } from "./types";
import { colorImageIsLight } from "./../../helpers/global";
import If from "./../../elements/If";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CardListPeople: React.FC<ICardLlistPeopleProps> = (props): JSX.Element => {

    const [colorText, setColorText] = useState("#FFF");
    const animationButtonRef = useRef(null);

    useEffect(() => {
        if (props.animationInitial) {
            const animation = animationButtonRef.current[`${props.animationInitial}`];
            animation(props.animationDuration || 500);
        }
    }, []);

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

    const onPressCard = (): void => {
        if (props.animationPress) {
            const animation = animationButtonRef.current[`${props.animationPress}`];
            animation(150);
        }
        props?.onPressCard();
    }

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
                    source={props.avatar}
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

export default CardListPeople;
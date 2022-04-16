import { Animated } from "react-native";

const effectAnimationResult = (
    scroll: Animated.Value, 
    inputRange: any[], 
    outputRange: any[]
): Animated.AnimatedInterpolation => {
    return scroll?.interpolate({
        inputRange, 
        outputRange,
        extrapolate: "clamp"
    });
};

export {
    effectAnimationResult
};
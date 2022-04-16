import * as React from "react"
import { Animated, SafeAreaView, Text } from "react-native";
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform */


export function LoadSvg(props) {
    
    
    
    const animatedValueRef = React.useRef(new Animated.Value(0)).current
    
    const runAnimation = () => {
        console.log("AQUI")
        Animated.timing(animatedValueRef, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true // Add This line
        }).start();
    }

    React.useEffect(() => {
        runAnimation()
    }, [])
    
  return (
    <SafeAreaView style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Animated.View style={{
            opacity: animatedValueRef,
            // transform: [{ rotate: `${parseInt(animatedValueRef)}deg` }]
            // transform: [{ rotate: "45deg" }]
        }}>
            <Svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                margin: "auto",
                background: "0 0",
                // transform: [{ rotate: "45deg" }]
                
            }}
            width={200}
            height={200}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            {...props}
            >
            <Path d="M10 50a40 40 0 0080 0 40 42 0 01-80 0" fill="#fff"></Path>
            </Svg>
        </Animated.View>
    </SafeAreaView>
  )
}

export default LoadSvg
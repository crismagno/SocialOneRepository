/**
 * Note.: Sizes based on Phone => Pixel_4_XL_API_30 -> 1440 X 3040
 */
import { Dimensions, Platform, PixelRatio } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const SIZE_100: number = HEIGHT/8; // based in 100px

/**
 * calculation for size responsiveness
*/
export const setSize = (size: number): number => (SIZE_100 * size)/100;

export const getPixelSize = pixels => {
    return Platform.select({
        ios: pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels)
    });
}; 


export default {
    SIZE_100,
    setSize,
    getPixelSize
};
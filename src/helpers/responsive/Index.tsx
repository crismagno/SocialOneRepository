/**
 * Note.: Sizes based on Phone => Pixel_4_XL_API_30 -> 1440 X 3040
 */
import { Dimensions } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const SIZE_100: number = HEIGHT/8; // based in 100px

/**
 * calculation for size responsiveness
*/
export const setSize = (size: number): number => (SIZE_100 * size)/100;

export default {
    SIZE_100,
    setSize
};
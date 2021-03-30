import React from "react";
import { View, Text, TextInput } from "react-native";
import generalAssets from "../../assets/general/index";
import styles from "./styles";

const Input: React.FC = () => {
    return <View style={styles.container}>
        <Text>Input</Text>
    </View>;
};

export default Input;


// export default props => {
//     const [hasFocus, setHasFocus] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
    
//     return <View style={[styles.viewInput, props.style]}>
//         {<View style={styles.viewIcon}>{props.iconLeft}</View> || null}
//         <TextInput style={hasFocus ? generalStyles.inputFormActive2 : generalStyles.inputForm2}  
//             value={props.value}
//             onChangeText={value => props.onChangeText(value)}
//             onFocus={() => setHasFocus(true)}
//             onBlur={() => setHasFocus(false)}
//             placeholder={props.placeholder} 
//             secureTextEntry={props.secureTextEntry && !showPassword}
//             placeholderTextColor={generalStyles.colors.colorA25}
//             selectionColor={generalStyles.colors.colorA3}
//             keyboardType={props.keyboardType || "default"}
//         />
//         {
//             props.secureTextEntry &&
//             <TouchableOpacity style={styles.btnIconPassword} onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons style={styles.iconInput} name={showPassword ? "eye-outline" : "eye-off-outline"} size={setSize(21)} color={generalStyles.colors.colorA10} />
//             </TouchableOpacity> ||
//             null
//         }
//     </View>
// };
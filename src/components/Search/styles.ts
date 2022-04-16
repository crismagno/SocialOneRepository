import { StyleSheet } from 'react-native';
import { colorsSocial } from '../../assets/general';
import { setSize } from '../../helpers/responsive/Index';

// Later on in your styles..
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: setSize(13),
        zIndex: 1000,
    },
    input: (color: string): any => ({
        backgroundColor: "transparent",
        height: setSize(50),
    })
});

export default styles;
import { StyleSheet } from 'react-native';
import { setSize } from '../../helpers/responsive/Index';

// Later on in your styles..
const styles = StyleSheet.create({
  buttonShowSearch: {
    // position: "absolute",
    width: setSize(50),
    height: setSize(50),
    borderRadius: setSize(100),
    // bottom: setSize(70),
    // right: setSize(20),
}
});

export default styles;
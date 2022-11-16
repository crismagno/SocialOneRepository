import {StyleSheet} from 'react-native';
import {setSize} from '../../helpers/responsive/Index';

const styles = StyleSheet.create({
  logo: (width: number, height: number): any => ({
    width: setSize(width),
    height: setSize(height),
  }),
});

export default styles;

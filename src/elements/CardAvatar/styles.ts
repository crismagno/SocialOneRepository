import {StyleSheet, ViewStyle} from 'react-native';
import {setSize} from '../../helpers/responsive/Index';

const styles = StyleSheet.create({
  avatar: (size: number) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: setSize(size),
    height: setSize(size),
  }),
});

export default styles;

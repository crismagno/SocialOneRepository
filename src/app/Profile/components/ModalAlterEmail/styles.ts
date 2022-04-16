import {StyleSheet, Dimensions, ViewStyle} from 'react-native';
import {colorsSocial} from '../../../../assets/general';
import {setSize} from '../../../../helpers/responsive/Index';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    marginLeft: setSize(10),
    fontSize: setSize(16),
    fontWeight: '700',
    color: colorsSocial.colorA4,
  },
  input: {
    height: setSize(50),
    width: setSize(300),
    backgroundColor: colorsSocial.colorA1,
    marginTop: setSize(20),
  },
  mt1: {
    marginTop: setSize(20),
  },
  button: {
    width: setSize(300),
    marginTop: setSize(20),
  },
});

export default styles;

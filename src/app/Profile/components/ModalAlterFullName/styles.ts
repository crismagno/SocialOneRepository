import {StyleSheet, Dimensions, ViewStyle} from 'react-native';
import {colorsSocial} from '../../../../assets/general';
import {setSize} from '../../../../helpers/responsive/Index';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: setSize(10),
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: setSize(20),
    fontWeight: 'bold',
  },
  input: {
    height: setSize(50),
    width: setSize(300),
    backgroundColor: colorsSocial.colorA1,
    marginTop: setSize(20),
  },
  button: {
    width: setSize(300),
    marginTop: setSize(20),
  },
});

export default styles;

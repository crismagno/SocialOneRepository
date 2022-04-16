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
  button: {
    width: setSize(300),
    marginTop: setSize(20),
  },
  textTitle: {
    fontSize: setSize(20),
    fontWeight: "bold"
  }
});

export default styles;

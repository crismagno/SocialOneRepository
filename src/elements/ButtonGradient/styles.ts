import {StyleSheet} from 'react-native';
import {setSize} from '../../helpers/responsive/Index';
import {colorsSocial} from '../../assets/general/colors';

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    height: setSize(40),
    borderRadius: setSize(5),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: setSize(15),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: colorsSocial.colorA1,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default styles;
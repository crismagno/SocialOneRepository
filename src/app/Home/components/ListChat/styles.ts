import {Dimensions, StyleSheet} from 'react-native';
import {setSize} from '../../../../helpers/responsive/Index';

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  containerList: {
    paddingHorizontal: setSize(10),
    paddingVertical: setSize(7),
  },
  containerListStyle: (showSearch: boolean): any => ({
    paddingBottom: setSize(showSearch ? 50 : 50),
  }),
  viewButtonBottomLoadList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

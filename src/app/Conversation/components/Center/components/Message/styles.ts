import {Dimensions, StyleSheet} from 'react-native';
import { colorsSocial } from '../../../../../../assets/general';
import {setSize} from '../../../../../../helpers/responsive/Index';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: (
    isUserApplication: boolean,
    messageIsSelectedToRemove: boolean,
  ) => ({
    flexDirection: isUserApplication ? 'row-reverse' : 'row',
    alignItems: 'center',
    paddingHorizontal: setSize(10),
    paddingVertical: setSize(0.5),
    backgroundColor: messageIsSelectedToRemove ? colorsSocial.colorA12 : "transparent"
  }),
});

export default styles;

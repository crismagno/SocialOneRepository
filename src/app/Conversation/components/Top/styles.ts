import {Dimensions, StyleSheet, ViewStyle} from 'react-native';
import {colorsSocial} from '../../../../assets/general';
import {setSize} from '../../../../helpers/responsive/Index';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');
const SIZE_IMAGE = 35;

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: setSize(40),
    width: WIDTH,
    padding: setSize(10),
    backgroundColor: colorsSocial.colorA4,
    elevation: 4
  },
  left: {
    marginRight: setSize(10),
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  right: {
    marginRight: setSize(10),
  },
  buttonGoBack: {
    width: setSize(35),
    height: setSize(35),
  },
  viewAvatar: {
    width: setSize(SIZE_IMAGE),
    height: setSize(SIZE_IMAGE),
    borderRadius: setSize(SIZE_IMAGE),
    marginRight: setSize(7),
    elevation: 1,
    backgroundColor: colorsSocial.colorA1,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: setSize(SIZE_IMAGE),
  },
  avatarContainer: {},
  fullName: {
    color: colorsSocial.colorA1,
    fontWeight: '600',
    maxWidth: setSize(160),
  },
  viewOnline: (isOnline: boolean, borderColor: string): ViewStyle => {
    const backgroundColor = isOnline ? '#65ec99' : '#d2d6d4';
    return {
      position: 'absolute',
      right: setSize(SIZE_IMAGE / 20),
      bottom: setSize(SIZE_IMAGE / 40),
      width: setSize(SIZE_IMAGE / 4),
      height: setSize(SIZE_IMAGE / 4),
      borderRadius: setSize(SIZE_IMAGE),
      backgroundColor,
      borderColor,
      borderWidth: setSize(1),
    };
  },
  textValueActions: {
    color: colorsSocial.colorA1,
    fontWeight: 'bold',
    fontSize: setSize(16),
    maxWidth: setSize(50)
  },
});

export default styles;

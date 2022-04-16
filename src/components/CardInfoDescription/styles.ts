import {StyleSheet} from 'react-native';
import {colorsSocial} from '../../assets/general';
import {setSize} from '../../helpers/responsive/Index';

const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: 'row',
    paddingTop: setSize(10),
    overflow: "hidden"
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeft: {
    // paddingTop: setSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: setSize(70),
  },
  containerRight: {
    flex: 1,
    paddingRight: setSize(5),
    borderBottomWidth: setSize(1),
    borderColor: 'rgba(0,0,0,.05)',
    paddingBottom: setSize(5),
  },
  containerRightTop: {
    marginBottom: setSize(7),
  },
  textTitle: {
    fontSize: setSize(14),
    color: '#0008',
    marginRight: setSize(5),
  },
  textSubtitle: {
    fontSize: setSize(14),
    color: '#000',
    marginTop: setSize(-3),
  },
  containerBottom: {
    paddingBottom: setSize(7),
  },

  textDescription: {
    fontSize: setSize(13),
    color: '#0006',
    textAlign: 'left',
  },
});

export default styles;

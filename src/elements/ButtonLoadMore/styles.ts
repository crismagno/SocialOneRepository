import {StyleSheet} from 'react-native';
import {setSize} from '../../helpers/responsive/Index';

// Later on in your styles..
const styles = StyleSheet.create({
  buttonGetMoreChatsByUser: {
    width: setSize(60),
    borderRadius: setSize(10)
}
});

export default styles;
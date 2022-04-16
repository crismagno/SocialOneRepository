import {StyleSheet} from 'react-native';
import {setSize} from '../../helpers/responsive/Index';

// Later on in your styles..
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGetMoreChatsByUser: {
    width: setSize(60),
    borderRadius: setSize(10),
    marginTop: setSize(5)
}
});

export default styles;
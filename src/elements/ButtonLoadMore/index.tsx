import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { IButtonLoadMoreProps } from './types';
import ButtonGradient from '../ButtonGradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setSize } from '../../helpers/responsive/Index';

const ButtonLoadMore: React.FC<IButtonLoadMoreProps> = (props): JSX.Element => {
  return <View style={{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <ButtonGradient
      style={styles.buttonGetMoreChatsByUser}
      load={props.load}
      colors={["#0004", "#0004"]}
      onPress={props.onPress}
      animationInitial={"fadeIn"}
      animationClick={"pulse"}
      iconRight={
        <Ionicons
          name={"add-circle-outline"}
          size={setSize(22)}
          color={"#FFF"}
        />
      }
    />
  </View>
};

export default ButtonLoadMore;

import React from 'react';
import {View} from 'react-native-animatable';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colorsSocial} from '../../assets/general';
import {setSize} from '../../helpers/responsive/Index';

interface Props {
  size?: number;
}

const CardAvatar: React.FC<Props> = ({size = 60}): JSX.Element => {
  return (
    <View style={styles.avatar(size)}>
      <FontAwesome5
        name={'user-astronaut'}
        color={colorsSocial.colorA1}
        size={setSize(size / 1.5)}
      />
    </View>
  );
};

export default CardAvatar;

import React, {memo} from 'react';
import styles from './styles';
import {IButtonLoadMoreProps} from './types';
import ButtonGradient from '../ButtonGradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setSize} from '../../helpers/responsive/Index';

export const ButtonLoadMore: React.FC<IButtonLoadMoreProps> = (
  props,
): JSX.Element => {
  return (
    <ButtonGradient
      style={styles.buttonGetMoreChatsByUser}
      load={props.load}
      colors={['transparent', 'transparent']}
      onPress={props.onPress}
      animationInitial={'pulse'}
      animationClick={'pulse'}
      iconRight={
        <Ionicons
          name={'reload-outline'}
          size={setSize(25)}
          color={props?.colorComponents}
        />
      }
      loadColor={props?.colorComponents}
      sizeLoad={30}
      typeLoad={1}
    />
  );
};

export default memo(ButtonLoadMore);

import React, { memo } from 'react';
import styles from './styles';
import { IButtonIconProps } from './types';
import ButtonGradient from '../ButtonGradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setSize } from '../../helpers/responsive/Index';
import If from '../If';

export const ButtonIcon: React.FC<IButtonIconProps> = (props): JSX.Element => {
  return <If condition={props.show}>
    <ButtonGradient
      style={[
        styles.buttonShowSearch, 
        props.style
      ]}
      load={false}
      colors={[props?.colorComponents, props?.colorComponents]}
      onPress={props.onPress}
      animationInitial={"fadeInUp"}
      animationClick={"pulse"}
      iconRight={
        <Ionicons
          name={props.nameIcon}
          size={setSize(20)}
          color={props?.colorIcon}
        />
      }
    />
  </If>
};

export default memo(ButtonIcon);

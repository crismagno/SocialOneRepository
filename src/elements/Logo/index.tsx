import React, {memo} from 'react';
import {Image} from 'react-native';
import generalAssets from '../../assets/general/index';
import styles from './styles';
import {ILogoProps} from './types';

const Logo: React.FC<ILogoProps> = ({
  width = 170,
  height = 170,
  type = 0,
}): JSX.Element => {
  return (
    <Image
      style={styles.logo(width, height)}
      source={generalAssets.images.logos[type]}
    />
  );
};

export default Logo;

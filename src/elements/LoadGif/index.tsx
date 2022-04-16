import React, {memo} from 'react';
import {ILoadGifProps} from './types';
import images from '../../assets/general/images';
import {Image} from 'react-native';
import styles from './styles';

export const LoadGif: React.FC<ILoadGifProps> = (props): JSX.Element => {
  const {size, type} = props;
  return <Image style={styles.load(size)} source={images.loads[typeof type == "number" && type || 1]} />;
};

export default memo(LoadGif);

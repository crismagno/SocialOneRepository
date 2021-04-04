import React from 'react';
import {Image} from 'react-native';
import {loads} from '../../assets/general/images';
import {setSize} from '../../helpers/responsive/Index';
import { ILoadCircleProps } from './types';

const LoadCircle: React.FC<ILoadCircleProps> = (props): JSX.Element => {
  const size = setSize(props.size || 20);
  return (
    <Image
      style={{
        width: size,
        height: size,
      }}
      source={loads[0]}
    />
  );
};

export default LoadCircle;

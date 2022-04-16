import React, {memo} from 'react';
import {setSize} from '../../helpers/responsive/Index';
import {ILoadCircleProps} from './types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

export const LoadCircle: React.FC<ILoadCircleProps> = (props): JSX.Element => {
  return (
    <Animatable.View
      animation={'rotate'}
      duration={props.duration || 1000}
      iterationDelay={props.iterationDelay || 10}
      easing="ease-in-out"
      iterationCount="infinite">
      <AntDesign
        name={'loading1'}
        size={setSize(props.size || 20)}
        color={props.color}
      />
    </Animatable.View>
  );
};

export default memo(LoadCircle);

import React, {memo, useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import If from '../If';
import {IAnimatableWrapperProps} from './types';

const VALUE_DURATION_AND_DELAY = 500;

export const AnimatableWrapper: React.FC<IAnimatableWrapperProps> = (
  props,
): JSX.Element => {
  useEffect(() => {
    animationShowExec();
  }, [props.show]);

  const animationShowExec = async (): Promise<void> => {
    if (props.show) {
      await animationRef.current?.animate(
        props.showAnimation,
        props.durationShowAnimation || VALUE_DURATION_AND_DELAY,
        props.delayShowAnimation || VALUE_DURATION_AND_DELAY,
      );
      setShow(true);
    } else {
      await animationRef.current?.animate(
        props.hideAnimation,
        props.durationHideAnimation || VALUE_DURATION_AND_DELAY,
        props.delayHideAnimation || VALUE_DURATION_AND_DELAY,
      );
      setShow(false);
    }
  };

  const animationRef = useRef(null);
  const [show, setShow] = useState(props.show || false);

  return (
    <If condition={show}>
      <Animatable.View style={[props.style]} ref={animationRef}>
        {props.children}
      </Animatable.View>
    </If>
  );
};

export default memo(AnimatableWrapper);

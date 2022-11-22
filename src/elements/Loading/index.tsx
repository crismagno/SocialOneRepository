import React, {useEffect, useState, useRef, memo} from 'react';
import * as Animatable from 'react-native-animatable';
import LoadGif from '../LoadGif';
import If from '../If';
import styles from './styles';
import {ILoadingProps} from './types';

export const Loading: React.FC<ILoadingProps> = (props): JSX.Element => {
  const [show, setShow] = useState<boolean>(props.show);

  const loadBoxAnimationRef = useRef(null);

  useEffect(() => {
    const animationShow = async () => {
      if (props.show) {
        await loadBoxAnimationRef.current?.animate('fadeIn', 1000, 1500);
      } else {
        await loadBoxAnimationRef.current?.animate('fadeOut', 500, 500);
      }
      setShow(props.show);
    };

    animationShow();
  }, [props.show]);

  return (
    <If condition={show}>
      <Animatable.View style={styles.container}>
        <Animatable.View
          ref={loadBoxAnimationRef}
          animation={'fadeIn'}
          duration={1000}
          style={styles.containerInto}>
          <LoadGif type={1} />
          <If condition={!!props?.description?.trim()}>
            <Animatable.Text
              style={styles.textDescription}
              animation={'flipInX'}>
              {props.description}
            </Animatable.Text>
          </If>
        </Animatable.View>
      </Animatable.View>
    </If>
  );
};

export default memo(Loading);

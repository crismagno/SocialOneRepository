import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import If from './../../elements/If';
import * as Animatable from 'react-native-animatable';
import LoadCircle from '../../elements/LoadCircle';
import {colorsSocial} from '../../assets/general';
import {ICardInfoDescriptionProps} from './types';

export const CardInfoDescription: React.FC<ICardInfoDescriptionProps> = (
  props,
): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.containerInfo}
      activeOpacity={0.5}
      onPress={() => !props.load && props.onPress()}>
      <Animatable.View animation={'fadeInLeft'} style={styles.containerLeft}>
        {props.iconLeft}
      </Animatable.View>
      <View style={styles.containerRight}>
        <View style={styles.containerRightTop}>
          <If condition={!!props.title}>
            <View style={styles.viewTitle}>
              <Animatable.Text
                animation={'fadeIn'}
                numberOfLines={1}
                style={styles.textTitle}>
                {props.title}
              </Animatable.Text>
              <If condition={!props.load}>{props.iconRightTitle}</If>
              <If condition={props.load}>
                <LoadCircle color={colorsSocial.colorA4} size={15} />
              </If>
            </View>
          </If>
          <If condition={!!props.subtitle}>
            <Animatable.Text
              animation={'fadeIn'}
              numberOfLines={1}
              style={styles.textSubtlitle}>
              {props.subtitle}
            </Animatable.Text>
          </If>
        </View>
        <If condition={!!props.description}>
          <View style={styles.containerBottom}>
            <Animatable.Text
              animation={'fadeInUp'}
              style={styles.textDescription}>
              {props.description}
            </Animatable.Text>
          </View>
        </If>
      </View>
    </TouchableOpacity>
  );
};

export default CardInfoDescription;

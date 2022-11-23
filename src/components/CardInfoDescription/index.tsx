import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import If from './../../elements/If';
import * as Animatable from 'react-native-animatable';
import LoadCircle from '../../elements/LoadCircle';
import {colorsSocial} from '../../assets/general';
import {ICardInfoDescriptionProps} from './types';

export const CardInfoDescription: React.FC<ICardInfoDescriptionProps> = ({
  onPress,
  description,
  iconLeft,
  iconRightTitle,
  load,
  subtitle,
  title,
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.containerInfo}
      activeOpacity={0.5}
      onPress={() => !load && onPress()}>
      <Animatable.View animation={'fadeInLeft'} style={styles.containerLeft}>
        {iconLeft}
      </Animatable.View>

      <View style={styles.containerRight}>
        <View style={styles.containerRightTop}>
          <If condition={!!title}>
            <View style={styles.viewTitle}>
              <Animatable.Text
                animation={'fadeIn'}
                numberOfLines={1}
                style={styles.textTitle}>
                {title}
              </Animatable.Text>

              <If condition={!load}>{iconRightTitle}</If>

              <If condition={load}>
                <LoadCircle color={colorsSocial.colorA4} size={15} />
              </If>
            </View>
          </If>

          <If condition={!!subtitle}>
            <Animatable.Text
              animation={'fadeIn'}
              numberOfLines={1}
              style={styles.textSubtlitle}>
              {subtitle}
            </Animatable.Text>
          </If>
        </View>

        <If condition={!!description}>
          <View style={styles.containerBottom}>
            <Animatable.Text
              animation={'fadeInUp'}
              style={styles.textDescription}>
              {description}
            </Animatable.Text>
          </View>
        </If>
      </View>
    </TouchableOpacity>
  );
};

export default CardInfoDescription;

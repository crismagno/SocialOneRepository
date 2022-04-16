import React, {memo, useRef} from 'react';
import If from '../../elements/If';
import {TextInput} from 'react-native-paper';
import {Animated} from 'react-native';
import {ISearchProps} from './types';
import styles from './styles';

export const Search: React.FC<ISearchProps> = (props): JSX.Element => {

  const colorText = props?.colorComponents;
  const inputRef = useRef(null);
  const theme = {
    colors: {
      primary: colorText,
      text: colorText,
      placeholder: colorText,
      underlineColor: colorText,
      cursorColor: colorText,
    },
  };

  return (
    <If condition={props?.show}>
      <Animated.View
        style={[styles.container, props?.style]}
    >
        <TextInput
          ref={inputRef}
          style={styles.input(colorText)}
          theme={theme}
          placeholderTextColor={colorText}
          underlineColor={colorText}
          selectionColor={colorText}
          label={props.label}
          value={props.value}
          onChangeText={(text) => props.setValue(text)}
          right={
            <TextInput.Icon 
              name="magnify" 
              color={colorText} 
              onPress={() => props.setValue(props.value)}
            />
          }
          left={
            props.value && (
              <TextInput.Icon
                name="close"
                color={colorText}
                onPress={() => props.setValue('')}
              />
            )
          }
          placeholder={props.placeholder}
        />
      </Animated.View>
    </If>
  );
};

export default memo(Search);

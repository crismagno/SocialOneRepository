import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import If from './../../../../elements/If';
import TextInputMask from 'react-native-text-input-mask';
import {ISignUpCenterProps} from './types';
import {setSize} from '../../../../helpers/responsive/Index';
import {colorsSocial} from '../../../../assets/general/colors';

const SignUpCenter: React.FC<ISignUpCenterProps> = (props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(true);
  const [isFocusedPhone, setIsFocusPhone] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitEditing = () => {
    if (
      !!props.user.fullName.trim() &&
      !!props.user.email.trim() &&
      !!props.user.phone.trim() &&
      !!props.user.password.trim()
    ) {
      props.onSubmit();
    }
  };

  return (
    <>
      <TextInput
        ref={fullNameRef}
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.input}
        onFocus={() =>
          props.setInputsError((input) => ({...input, fullName: ''}))
        }
        mode="outlined"
        label="Full Name"
        value={props.user.fullName}
        error={!!props.inputsError.fullName.trim()}
        onChangeText={(text) => props.setUser({...props.user, fullName: text})}
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'account'}
            size={setSize(17)}
            color={
              fullNameRef?.current?.isFocused() ? colorsSocial.colorA4 : '#0005'
            }
          />
        }
      />
      <If condition={!!props.inputsError.fullName.trim()}>
        <Text style={styles.textRequired}>{props.inputsError.fullName}</Text>
      </If>

      <TextInput
        ref={emailRef}
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.input}
        onFocus={() => props.setInputsError((input) => ({...input, email: ''}))}
        keyboardType="email-address"
        mode="outlined"
        label="E-mail"
        value={props.user.email}
        error={!!props.inputsError.email.trim()}
        onChangeText={(text) => props.setUser({...props.user, email: text})}
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'at'}
            size={setSize(17)}
            color={
              emailRef?.current?.isFocused() ? colorsSocial.colorA4 : '#0005'
            }
          />
        }
      />
      <If condition={!!props.inputsError.email.trim()}>
        <Text style={styles.textRequired}>{props.inputsError.email}</Text>
      </If>

      <TextInput
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.input}
        onFocus={() => {
          props.setInputsError((input) => ({...input, phone: ''}));
          setIsFocusPhone(true);
        }}
        onBlur={() => setIsFocusPhone(false)}
        keyboardType="phone-pad"
        mode="outlined"
        label="Phone"
        value={props.user.phone}
        placeholder="+55 (99) 9 9999-9999"
        error={!!props.inputsError.phone.trim()}
        onChangeText={(text) => props.setUser({...props.user, phone: text})}
        render={(props) => (
          <TextInputMask {...props} mask="+[00] ([00]) [0] [0000]-[0000]" />
        )}
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'phone'}
            size={setSize(17)}
            color={isFocusedPhone ? colorsSocial.colorA4 : '#0005'}
          />
        }
      />
      <If condition={!!props.inputsError.phone.trim()}>
        <Text style={styles.textRequired}>
          {props.inputsError.phone.trim()}
        </Text>
      </If>

      <TextInput
        ref={passwordRef}
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.input}
        onFocus={() =>
          props.setInputsError((input) => ({...input, password: ''}))
        }
        mode="outlined"
        label="Password"
        secureTextEntry={showPassword}
        value={props.user.password}
        error={!!props.inputsError.password.trim()}
        onChangeText={(text) => props.setUser({...props.user, password: text})}
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'key'}
            size={setSize(17)}
            color={
              passwordRef?.current?.isFocused() ? colorsSocial.colorA4 : '#0005'
            }
          />
        }
        right={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={showPassword ? 'eye-off' : 'eye'}
            size={setSize(17)}
            color={
              !showPassword && passwordRef.current?.isFocused()
                ? colorsSocial.colorA4
                : '#0005'
            }
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <If condition={!!props.inputsError.password.trim()}>
        <Text style={styles.textRequired}>{props.inputsError.password}</Text>
      </If>
    </>
  );
};

export default SignUpCenter;

import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import If from './../../../../elements/If';
import {ISignInCenterProps} from './types';
import {IUserSignIn} from '../../../../services/user/types';
import {setSize} from '../../../../helpers/responsive/Index';
import {colorsSocial} from '../../../../assets/general/colors';

const SignInCenter: React.FC<ISignInCenterProps> = (props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitEditing = () => {
    if (!!props.user.email.trim() && !!props.user.password.trim()) {
      props.onSubmit();
    }
  };

  return (
    <>
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
        onChangeText={(text) =>
          props.setUser((userState: IUserSignIn) => ({
            ...userState,
            email: text,
          }))
        }
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'at'}
            size={setSize(17)}
            color={
              emailRef.current?.isFocused() ? colorsSocial.colorA4 : '#0005'
            }
          />
        }
      />
      <If condition={!!props.inputsError.email.trim()}>
        <Text style={styles.textRequired}>{props.inputsError.email}</Text>
      </If>

      <TextInput
        ref={passwordRef}
        onSubmitEditing={() => onSubmitEditing()}
        style={styles.input}
        onFocus={() =>
          props.setInputsError((input) => ({...input, password: ''}))
        }
        secureTextEntry={showPassword}
        mode="outlined"
        label="Password"
        value={props.user.password}
        error={!!props.inputsError.password.trim()}
        onChangeText={(text) =>
          props.setUser((userState: IUserSignIn) => ({
            ...userState,
            password: text,
          }))
        }
        left={
          <TextInput.Icon
            style={{marginTop: setSize(15)}}
            name={'key'}
            size={setSize(17)}
            color={
              passwordRef.current?.isFocused() ? colorsSocial.colorA4 : '#0005'
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

export default SignInCenter;

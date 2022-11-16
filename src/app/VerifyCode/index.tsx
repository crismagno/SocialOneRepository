import React, {
  useState,
  useRef,
  MutableRefObject,
  useEffect,
  memo,
} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import {Button} from 'react-native-paper';
import ButtonGradient from '../../elements/ButtonGradient';
import {backgrounds} from '../../assets/general/images';
import {code as codeService} from './../../services';
import localStorage from './../../infra/localStorage';
import {colorsSocial} from '../../assets/general/colors';
import {errorHandling} from '../../helpers/global';
import {resetHistory} from './../../navigation/actions';
import {TRouteRedirect} from '../../types';
import * as Animatable from 'react-native-animatable';
import Logo from '../../elements/Logo';
import IndexActionsStore from '../../reduxStore';
import SnackBarSocialDefault from '../../elements/SnackBarSocial';

const VerifyCode: React.FC<any> = (props): JSX.Element => {
  useEffect(() => {
    inputsRef[0].current.focus();
  }, []);

  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;

  const quantityInputs: number = 4;
  const inputsArrayString: string[] = Array(quantityInputs).fill('');
  const inputsRef: MutableRefObject<any>[] = inputsArrayString.map(() =>
    useRef(),
  );

  const [code, setCode] = useState<string[]>(inputsArrayString);
  const [load, setLoad] = useState<boolean>(false);

  const goToRoute = (route: TRouteRedirect): void => resetHistory(props, route);

  const validateInputs = (): boolean => {
    const validCode = code.join('').replace(' ', '');
    if (validCode.length < quantityInputs) {
      SnackBarSocialDefault({
        text: 'Fill all field',
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA3,
        colorButton: colorsSocial.colorA3,
      });
      return true;
    }
    return false;
  };

  const validateCode = async (): Promise<void> => {
    try {
      if (validateInputs()) return;
      setLoad(true);
      const codeBody = code.join('');
      const response = await codeService.validateCode({
        userId: user._id,
        code: codeBody,
        typeCode: 'VERIFY_CODE',
      });
      await localStorage.setUser(user);
      goToRoute('App');
      SnackBarSocialDefault({
        text: response.message,
        duration: 'LENGTH_SHORT',
        textColor: colorsSocial.colorA1,
        colorButton: colorsSocial.colorA1,
      });
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA3,
        colorButton: colorsSocial.colorA3,
      });
    } finally {
      setLoad(false);
    }
  };

  const resendCode = async (): Promise<void> => {
    try {
      const response = await codeService.resendCode({
        userId: user._id,
        typeCode: 'VERIFY_CODE',
      });
      SnackBarSocialDefault({
        text: response.message,
        duration: 'LENGTH_SHORT',
        textColor: colorsSocial.colorA1,
        colorButton: colorsSocial.colorA1,
      });
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA3,
        colorButton: colorsSocial.colorA3,
      });
    }
  };

  const onKeyPress = async (event: any, item: number): Promise<void> => {
    let keyValue = event?.nativeEvent?.key?.trim().toUpperCase();
    let value = keyValue === 'BACKSPACE' ? '' : keyValue;

    for (let i = 0; i <= quantityInputs; i++) {
      if (item === 0) {
        if (value.trim()) {
          inputsRef[item + 1].current.focus();
        }
      } else if (item === quantityInputs - 1) {
        if (!value.trim()) {
          if (!code[item].trim()) {
            inputsRef[item - 1].current.focus();
          }
        }
      } else {
        if (!value.trim()) {
          if (!code[item].trim()) {
            inputsRef[item - 1].current.focus();
          }
        } else {
          inputsRef[item + 1].current.focus();
        }
      }
    }

    setCode((codeValue) =>
      codeValue.map((c, i) => (i === item ? String(value).toUpperCase() : c)),
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={'slideInDown'}
        style={styles.imageTop}
        source={backgrounds[0]}
      />
      <Animatable.Image
        animation={'slideInUp'}
        style={styles.imageBottom}
        source={backgrounds[2]}
      />
      <View style={styles.containerTop}>
        <Animatable.View delay={600} animation={'fadeInLeft'}>
          <Button
            color={colorsSocial.colorA1}
            style={styles.buttonTopLeft}
            icon="arrow-left"
            onPress={() => goToRoute('SignIn')}>
            {'SIGNIN'}
          </Button>
        </Animatable.View>
      </View>
      <View style={styles.containerCenter}>
        <Logo type={0} width={70} height={90} />
        {/* <Text style={styles.textSend}>{'Social Code'}</Text> */}
        <View style={styles.viewInputsCode}>
          {code.map(
            (_, index: number): JSX.Element => {
              return (
                <Animatable.View
                  animation={'zoomInDown'}
                  duration={2000}
                  delay={index * 10 + 500}
                  key={index}>
                  <TextInput
                    onSubmitEditing={() => {
                      index !== code.length - 1 &&
                        inputsRef[index + 1].current.focus();
                      index === quantityInputs - 1 && validateCode();
                    }}
                    ref={inputsRef[index]}
                    blurOnSubmit={false}
                    style={styles.inputCode}
                    onKeyPress={(event) => {
                      onKeyPress(event, index);
                    }}
                    value={code[index]}
                    maxLength={1}
                    underlineColorAndroid={colorsSocial.colorA4}
                    placeholderTextColor={colorsSocial.colorA4}
                    placeholder={''}
                  />
                </Animatable.View>
              );
            },
          )}
        </View>
        <View style={styles.viewInformation}>
          <Text style={styles.textInfo}>
            {
              'Please check the code in your E-mail box, or in the SMS of the registered Phone.'
            }
          </Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <ButtonGradient
          style={styles.buttonVerify}
          label="verify"
          toUpperCase={true}
          load={load}
          onPress={() => validateCode()}
          animationInitial={'fadeIn'}
          animationClick={'pulse'}
          typeLoad={1}
        />
        <Button onPress={() => resendCode()}>{'resend'}</Button>
      </View>
    </View>
  );
};

export default memo(VerifyCode);

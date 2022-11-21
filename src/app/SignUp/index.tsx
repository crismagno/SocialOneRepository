import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {ToastSocial} from './../../elements/ToastSocial';
import {getMessageError, validateEmail} from '../../helpers/global';
import {IUser, IUserCreate} from '../../types';
import {user as userService} from './../../services/index';
import localStorage from './../../infra/localStorage';
import {IndexActionsStore} from './../../reduxStore';
import {StateRequestSocial} from '../../helpers/request/StateRequestSocial';
import SignUpTop from './components/Top';
import SignUpCenter from './components/Center';
import SignUpBottom from './components/Bottom';
import {colorsSocial} from '../../assets/general';
import {SnackBarSocialDefault} from '../../elements';

const SignUp: React.FC<any> = (props): JSX.Element => {
  useEffect(() => {
    componentWillMount();
  }, []);

  const {actionsUser} = IndexActionsStore();

  const [user, setUser] = useState<IUserCreate>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [inputsError, setInputsError] = useState<IUserCreate>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [load, setLoad] = useState<boolean>(false);

  const componentWillMount = async (): Promise<void> => {
    await localStorage.removeUser();
    await localStorage.removeStep();
  };

  const validateInputs = (): boolean => {
    let numInputsInvalid = 0;
    for (const key in user) {
      if (user[key].trim() === '') {
        numInputsInvalid++;
        setInputsError((inp) => ({...inp, [key]: 'Field required'}));
      } else {
        if (key === 'email') {
          if (!validateEmail(user[key])) {
            numInputsInvalid++;
            setInputsError((inp) => ({...inp, email: 'E-mail format invalid'}));
          } else {
            setInputsError((inp) => ({...inp, email: ''}));
          }
        } else if (key === 'phone') {
          if (user[key].length < 20) {
            numInputsInvalid++;
            setInputsError((inp) => ({...inp, phone: 'Phone format invalid'}));
          } else {
            setInputsError((inp) => ({...inp, phone: ''}));
          }
        } else {
          setInputsError((inp) => ({...inp, [key]: ''}));
        }
      }
    }

    if (numInputsInvalid > 0) {
      SnackBarSocialDefault({
        text: 'Fill in the required fields',
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA3,
        colorButton: colorsSocial.colorA3,
      });
      return true;
    }

    return false;
  };

  const clearUser = (): void => {
    setUser({
      fullName: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  const goToRoute = (route: string): void => {
    props.navigation.navigate(route);
  };

  const createUser = async (): Promise<void> => {
    try {
      if (validateInputs()) return;

      setLoad(true);

      const userResponse: IUser = await userService.signUp(user);
      actionsUser.setUser(userResponse);
      clearUser();

      await localStorage.setUser(userResponse);
      await localStorage.setStep('VerifyCode');
      StateRequestSocial.setTokenState(userResponse.token);
      SnackBarSocialDefault({
        text: 'Created!',
        duration: 'LENGTH_SHORT',
        textColor: colorsSocial.colorA4,
        colorButton: colorsSocial.colorA4,
      });
      goToRoute('VerifyCode');
    } catch (error) {
      SnackBarSocialDefault({
        text: getMessageError(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA3,
        colorButton: colorsSocial.colorA3,
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <SignUpTop />
      <SignUpCenter
        user={user}
        setUser={setUser}
        inputsError={inputsError}
        setInputsError={setInputsError}
        onSubmit={() => createUser()}
      />
      <SignUpBottom
        load={load}
        createUser={createUser}
        goToSignIn={() => goToRoute('SignIn')}
      />
    </View>
  );
};

export default SignUp;

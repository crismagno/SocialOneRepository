import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {user as userService} from './../../services/index';
import {IUserSignIn} from '../../services/user/types';
import {IUser} from '../../types';
import {handleError, validateEmail} from './../../helpers/global';
import localStorage from './../../infra/localStorage';
import {IndexActionsStore} from './../../reduxStore';
import {StateRequestSocial} from '../../helpers/request/StateRequestSocial';
import SignInTop from './components/Top';
import SignInCenter from './components/Center';
import SignInBottom from './components/Bottom';
import {SnackBarSocialDefault} from './../../elements';
import {colorsSocial} from '../../assets/general';
import UserEnum from '../../shared/user/user.enum';

const SignIn: React.FC<any> = (props): JSX.Element => {
  const {actionsUser} = IndexActionsStore();

  const [user, setUser] = useState<IUserSignIn>({
    email: '',
    password: '',
  });

  const [inputsError, setInputsError] = useState<IUserSignIn>({
    email: '',
    password: '',
  });

  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    const componentWillMount = async (): Promise<void> => {
      await localStorage.removeUser();
      await localStorage.removeStep();
    };

    componentWillMount();
  }, []);

  const validateInputs = (): boolean => {
    let numInputsInvalid = 0;

    for (const key in user) {
      if (user[key].trim() === '') {
        numInputsInvalid++;
        setInputsError((inp) => ({...inp, [key]: 'Field is required'}));
      } else {
        if (key === 'email') {
          if (!validateEmail(user[key])) {
            numInputsInvalid++;
            setInputsError((inp) => ({...inp, email: 'E-mail format invalid'}));
          } else {
            setInputsError((inp) => ({...inp, email: ''}));
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

  const goToRoute = (route: string): void => props.navigation.navigate(route);

  const signIn = async (): Promise<void> => {
    try {
      if (validateInputs()) return;

      setLoad(true);

      const response: IUser = await userService.signIn(user);

      actionsUser.setUser(response);

      await localStorage.setUser(response);

      StateRequestSocial.setTokenState(response.token);

      if (response.role === UserEnum.Roles.MASTER) {
        await localStorage.setStep('App');

        goToRoute('App');

        return;
      }

      await localStorage.setStep('VerifyCode');

      goToRoute('VerifyCode');

      setUser({
        email: '',
        password: '',
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <SignInTop />
      <SignInCenter
        user={user}
        setUser={setUser}
        inputsError={inputsError}
        setInputsError={setInputsError}
        onSubmit={() => signIn()}
      />
      <SignInBottom
        load={load}
        signIn={() => signIn()}
        signUp={() => goToRoute('SignUp')}
      />
    </View>
  );
};

export default SignIn;

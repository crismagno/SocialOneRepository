import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Logo from '../../elements/Logo';
import styles from './styles';
import localStorage from './../../infra/localStorage';
import {IndexActionsStore} from './../../reduxStore';
import {StateRequestSocial} from '../../helpers/request/StateRequestSocial';
import {resetHistory} from './../../navigation/actions';
import {IUser, TRouteRedirect, TStepApp} from '../../types';
import * as Animatable from 'react-native-animatable';
import UserEnum from '../../shared/user/user.enum';

const SplashInit: React.FC = (props): JSX.Element => {
  const {actionsUser} = IndexActionsStore();

  const animatableRef: React.MutableRefObject<any> = useRef<
    Animatable.View & View
  >(null);

  const initialize = async (): Promise<void> => {
    await animatableRef.current?.animate('slideInUp', 1000);

    const responseVerifySession = await getRouteByLastStepSession();

    await animatableRef.current?.animate('slideOutUp', 1000);

    resetHistory(props, responseVerifySession);
  };

  const getRouteByLastStepSession = async (): Promise<TRouteRedirect> => {
    /* verify if user is localStorage Session
     * if user is session, make request to validate user exists on database
     * else user not redirect to signIn
     * if user exists on database verify "step fo localStorage Session"
     */
    const userLocalStorage: IUser = await localStorage.getUser();

    if (userLocalStorage) {
      StateRequestSocial.setTokenState(userLocalStorage.token); // insert in class de StateRequest

      actionsUser.setUser(userLocalStorage); // insert on user store redux

      const stepLocalStorage: TStepApp = await localStorage.getStep();

      if (
        userLocalStorage.role === UserEnum.Roles.MASTER ||
        stepLocalStorage === 'App'
      ) {
        return 'App';
      }

      if (stepLocalStorage === 'VerifyCode') {
        return 'VerifyCode';
      }
    }

    return 'SignIn';
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View ref={animatableRef}>
        <Logo type={0} width={120} height={140} />
      </Animatable.View>
    </View>
  );
};

export default SplashInit;

/**
 * In this file events, references actions that use navigaton
 */
import {CommonActions} from '@react-navigation/native';
import {TRouteRedirect} from '../types';

const actionsNavigation = (props: any) => {
  // reset history and redirect to route passed with param
  const resetHistory = (routeRedirect: TRouteRedirect): void | false => {
    let navigation = props && props.navigation;

    if (!navigation) {
      return false;
    }

    let reset = CommonActions.reset({
      index: 0,
      routes: [{name: routeRedirect}],
    });
    navigation.dispatch(reset);
  };

  return {
    resetHistory,
  };
};

export default actionsNavigation;

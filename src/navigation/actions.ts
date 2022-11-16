import {CommonActions} from '@react-navigation/native';
import {TRouteRedirect} from '../types';

export const resetHistory = (
  props: any,
  routeRedirect: TRouteRedirect,
): void => {
  const navigation = props?.navigation;

  if (!navigation) {
    return;
  }

  const reset: CommonActions.Action = CommonActions.reset({
    index: 0,
    routes: [{name: routeRedirect}],
  });

  navigation.dispatch(reset);
};

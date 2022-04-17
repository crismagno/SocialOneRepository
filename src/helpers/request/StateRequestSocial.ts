import {Platform} from 'react-native';
import localStorage from './../../infra/localStorage';
import {URL_ANDROID, URL_NOT_ANDROID} from './../../../env';
import {IUser} from '../../types';

export class StateRequestSocial {
  public static tokenUser: string = '';
  public static url: string = StateRequestSocial.getUrlApiSocialOne();

  public static setTokenState = (token: string) => {
    StateRequestSocial.tokenUser = token;
  };

  public static getTokenUser = async (): Promise<string> => {
    if (!!StateRequestSocial.tokenUser.trim()) {
      return StateRequestSocial.tokenUser;
    }
    const user: IUser = await localStorage.getUser();
    return user.token;
  };

  public static getUrlApiSocialOne(): string {
    return Platform.OS !== 'android' ? URL_NOT_ANDROID : URL_ANDROID;
  }

  // private static getIpAddressLocal(): string | null {
  //   try {
  //     const nets = networkInterfaces();
  //     const results = Object.create(null); // Or just '{}', an empty object

  //     for (const name of Object.keys(nets)) {
  //       for (const net of nets[name]) {
  //         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
  //         if (net.family === 'IPv4' && !net.internal) {
  //           if (!results[name]) {
  //             results[name] = [];
  //           }
  //           results[name].push(net.address);
  //         }
  //       }
  //     }

  //     const ipAddressLocal = JSON.stringify(results['Wi-Fi'][0]);
  //     return ipAddressLocal;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}

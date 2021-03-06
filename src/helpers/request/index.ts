import axios, {AxiosInstance} from 'axios';
import {StateRequestSocial} from './StateRequestSocial';
import {IRequestApi} from './types';

export const requestApi = async (
  params: IRequestApi = {
    route: '',
    body: {},
    method: 'GET',
    othersHeaders: {},
    authorization: false,
  },
): Promise<any | never> => {
  let headers = {
    'Content-type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };

  if (params.authorization) {
    const token: string = await StateRequestSocial.getTokenUser();
    if (!token) throw 'Token not exist';
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (params.othersHeaders) {
    headers = {...headers, ...params.othersHeaders};
  }

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: StateRequestSocial.url,
    headers,
    timeout: 120000,
  });

  switch (params.method.toUpperCase()) {
    case 'GET':
      return await axiosInstance.get(params.route);
    case 'POST':
      return await axiosInstance.post(params.route, params.body);
    case 'PUT':
      return await axiosInstance.put(params.route, params.body);
    case 'DELETE':
      return await axiosInstance.delete(params.route, params.body);
    default:
      throw 'Method pass error';
  }
};

export default {
  requestApi,
};

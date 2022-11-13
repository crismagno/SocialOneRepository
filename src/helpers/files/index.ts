import {Asset} from 'react-native-image-picker';
import {Platform} from 'react-native';
import {StateRequestSocial} from '../request/StateRequestSocial';

export const getFileByPath = (filePath: string): string => {
  return `${StateRequestSocial.url}files?file=${filePath}`;
};

export const getUrlByPlatform = (uri: string): string => {
  return Platform.OS === 'android' ? uri : uri.replace('file://', '');
};

export const createFormData = (
  file: Asset | any,
  body: any,
  nameAppendFile: string,
): FormData => {
  const data = new FormData();

  data.append(nameAppendFile, {
    name: file.fileName,
    type: file.type,
    uri: getUrlByPlatform(file.uri),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

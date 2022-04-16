import {Asset} from 'react-native-image-picker';
import {Platform} from 'react-native';
import { StateRequestSocial } from '../request/StateRequestSocial';

export const createFormData = (
  file: Asset | any,
  body: any,
  nameAppendFile: string,
): FormData => {
  const data = new FormData();

  data.append(nameAppendFile, {
    name: file.fileName,
    type: file.type,
    uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const getFileByPath = (filePath: string): string => {
  return `${StateRequestSocial.url}files?file=${filePath}`;
};

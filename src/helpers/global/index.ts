import ImageColors from 'react-native-image-colors';
import {colorsSocial} from '../../assets/general';
import SnackBarSocialDefault from '../../elements/SnackBarSocial';

// let imagePath = Image.resolveAssetSource(props.image).uri

export const validateEmail = (email: string): boolean => {
  const re: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const getMessageError = (error: any): string => {
  if (error?.response?.data?.message) {
    return `${error?.response?.data?.message}`;
  } else if (error?.response?.data) {
    return `${error?.response?.data}`;
  } else if (error?.message) {
    return error.message;
  } else {
    return 'Error Social Network';
  }
};

export const getColorDominantImage = async (image: any): Promise<string> => {
  let colorDominant: string = '';

  const colors = await ImageColors.getColors(image, {});

  if (colors.platform === 'android') colorDominant = colors.dominant;

  if (colors.platform !== 'android') colorDominant = colors.background;

  return colorDominant;
};

export const luminosity = (hex: string): number => {
  let r, g, b, longo;
  hex = hex.replace('#', '');
  longo = hex.length > 3;

  r = longo
    ? parseInt(hex.substr(0, 2), 16)
    : parseInt(hex.substr(0, 1), 16) * 17;
  g = longo
    ? parseInt(hex.substr(2, 2), 16)
    : parseInt(hex.substr(1, 1), 16) * 17;
  b = longo
    ? parseInt(hex.substr(4, 2), 16)
    : parseInt(hex.substr(2, 1), 16) * 17;

  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const colorImageIsLight = async (image: any): Promise<boolean> => {
  const hexByImage = await getColorDominantImage(image);
  const luminosityHexImage = luminosity(hexByImage);
  return luminosityHexImage > 200;
};

export const returnColorBasedOnLight = async (
  image: any,
  colorToImageMoreLuminosity: string,
  colorToImageLessLuminosity: string,
): Promise<string> => {
  const colorIsLight = await colorImageIsLight(image);
  if (!colorIsLight) {
    return colorToImageLessLuminosity;
  }

  if (colorIsLight) {
    return colorToImageMoreLuminosity;
  }
};

export const handleError = (error: any): void => {
  SnackBarSocialDefault({
    text: getMessageError(error),
    duration: 'LENGTH_LONG',
    textColor: colorsSocial.colorA13,
    colorButton: colorsSocial.colorA13,
  });
};

export default {
  validateEmail,
  getMessageError,
  getColorDominantImage,
  luminosity,
  colorImageIsLight,
};

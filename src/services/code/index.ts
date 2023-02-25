import request from './../../helpers/request';
import {ICodeResponse, IResendCode, IValidateCode} from './types';

export const validateCode = async (
  validate: IValidateCode,
): Promise<ICodeResponse | never> => {
  try {
    const response = await request.requestApi({
      route: `code/validate`,
      body: validate,
      method: 'POST',
      authorization: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateCodeChangeEmail = async (
  validate: IValidateCode,
): Promise<ICodeResponse | never> => {
  try {
    const response = await request.requestApi({
      route: `code/validate_change_email`,
      body: validate,
      method: 'POST',
      authorization: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendCode = async (
  resend: IResendCode,
): Promise<ICodeResponse | never> => {
  try {
    const response = await request.requestApi({
      route: `code/resend`,
      body: resend,
      method: 'POST',
      authorization: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

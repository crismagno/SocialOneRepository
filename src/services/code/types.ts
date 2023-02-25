import {TCode} from '../../types';

export interface IValidateCode {
  userId: string;
  code: string;
  typeCode: TCode;
}

export interface IResendCode {
  userId: string;
  typeCode: TCode;
}

export interface ICodeResponse {
  message: string;
}

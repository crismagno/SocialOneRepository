export interface IValidateCode {
    userId: string;
    code: string;
};

export interface IResendCode {
    userId: string;
};

export interface ICodeResponse {
    message: string; 
}
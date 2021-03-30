export const validateEmail = (email: string): boolean => {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const errorHandling = (error: any): string => {
    let errorReturn: string = "";
    if (error?.response?.data?.message) {
        errorReturn = `${error?.response?.data?.message}`;
    } else {
        errorReturn = "Error Social Network";
    }
    return errorReturn;
};

export default {
    validateEmail,
    errorHandling,
};
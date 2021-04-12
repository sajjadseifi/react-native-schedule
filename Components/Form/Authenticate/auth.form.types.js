import * as images from "../../../load/image";

export const FROM_INPUT_UPDATE = "FROM_INPUT_UPDATE";
export const FORM_SUBMITED = "FORM_SUBMITED";
export const FROM_INPUT_EMPTY = "FROM_INPUT_EMPTY";
export const FORM_EMPTY_ERRORS = "FORM_EMPTY_ERRORS";
//jsx page
export const FORM_LOGIN_JSX = "FORM_LOGIN_JSX";
export const FORM_SIGNUP_JSX = "FORM_SIGNUP_JSX";
export const FORM_FORGETPASSWORD_JSX = "FORM_FORGETPASSWORD_JSX";
export const FROM_CONFIREMD_CODE_JSX = "FROM_CONFIREMD_CODE_JSX";
export const FROM_RESET_PASSWORD_JSX = "FROM_RESET_PASSWORD_JSX";
//jsx page
export const FORM_LOGIN_PIC = images.login;
export const FORM_SIGNUP_PIC = images.signup;
export const FORM_FORGETPASSWORD_PIC = images.forgotPassword;
export const FROM_CONFIREMD_CODE_PIC = images.confirmCode;
export const FROM_RESET_PASSWORD_PIC = images.resetPassword;
//action server
export const FORM_LOGIN = "FORM_LOGIN";
export const FORM_SIGNUP = "FORM_SIGNUP";
export const FORM_FORGETPASSWORD = "FORM_FORGETPASSWORD";
export const FROM_CONFIREMD_CODE = "FROM_CONFIREMD_CODE";
export const FROM_RESET_PASSWORD = "FROM_RESET_PASSWORD";

export const submitedFormReducer = () => {
    return {
      type: FORM_SUBMITED,
    };
  };
  export const emptyErrors = () => {
    return {
      type: FORM_EMPTY_ERRORS,
    };
  };
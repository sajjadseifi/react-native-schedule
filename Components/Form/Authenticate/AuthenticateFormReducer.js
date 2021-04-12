import {
  FORM_EMPTY_ERRORS,
  FORM_SUBMITED,
  FROM_INPUT_EMPTY,
  FROM_INPUT_UPDATE,
} from "./auth.form.types";

export const initialState = {
  inputValues: {
    username: "",
    email: "",
    password: "",
    confirmCode: "",
    confirmPassword: "",
    forgetPassword: "",
  },
  inputValidities: {
    username: false,
    email: false,
    password: false,
    confirmCode: false,
    confirmPassword: false,
    forgetPassword: false,
  },
  inputErrors: {
    username: false,
    email: false,
    password: false,
    confirmCode: false,
    confirmPassword: false,
    forgetPassword: false,
  },
  formSubmited: false,
};

export const fromAuthReducer = (state, action) => {
  switch (action.type) {
    case FROM_INPUT_UPDATE:
      const upadteValus = {
        ...state.inputValues,
        [action.tag]: action.value,
      };
      const updateValidities = {
        ...state.inputValidities,
        [action.tag]: action.isValid,
      };
      const updateError = {
        ...state.inputErrors,
        [action.tag]: action.clientErorr,
      };
      return {
        ...state,
        inputValues: upadteValus,
        inputValidities: updateValidities,
        inputErrors: updateError,
      };
    case FROM_INPUT_EMPTY:
      return initialState;
    case FORM_EMPTY_ERRORS:
      return {
        ...state,
        inputErrors: initialState.inputErrors,
      };
    case FORM_SUBMITED:
      return {
        ...state,
        formSubmited: true,
      };
  }
  return state;
};

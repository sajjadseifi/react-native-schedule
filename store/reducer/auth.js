import { updateObject } from "../../utils/utils";
import {
  AUTH_FAIL,
  AUTH_FORM_ERRORS,
  AUTH_LOGOUT,
  AUTH_PASSWORD_RESETED,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_TOKEN_CONFIRM_CODE,
  AUTH_TOKEN_RESET_PASSWORD,
  EMPTY_MESSAGE,
  EMPTY_TOKENS,
  END_OF_REQUEST,
  END_START_UP,
  RESULT_REQUEST,
} from "../actions/actionsType";

const initialState = {
  isStartUp: true,
  token: null,
  userId: null,
  username: null,
  confirmToken: null,
  expiresInConfirmCode: 0,
  resetToken: null,
  loading: null,
  error: null,
  messageTitle: null,
  message: null,
  success: null,
  formErrors: null,
};
export let headerToken = null;
const startFetched = {
  formErrors: null,
  succsse: null,
  error: null,
  loading: true,
  message: null,
};
const endfetched = { loading: null };
const resetStateToken = {
  token: null,
  confirmToken: null,
  expiresInConfirmCode: 0,
  resetToken: null,
};

const authStart = (state, actions) => {
  headerToken = null;
  console.log("loading");
  return updateObject(state, { ...startFetched });
};
const authFormErrors = (state, actions) => {
  const { formErrors } = actions;
  return updateObject(state, { formErrors });
};
const authSuccess = (state, actions) => {
  const { token, username } = actions;
  headerToken = token;
  return updateObject(state, {
    ...endfetched,
    ...resetStateToken,
    token,
    username,
  });
};
const authFail = (state, actions) => {
  headerToken = null;
  const { error } = actions;
  console.log("Fail", error);
  return updateObject(state, { error, loading: null });
};
const authTokenConfirmCode = (state, actions) => {
  const { confirmToken, expiresInConfirmCode } = actions;
  headerToken = confirmToken;
  return updateObject(state, {
    ...endfetched,
    ...resetStateToken,
    confirmToken,
    expiresInConfirmCode,
  });
};
const authTokenResetPassword = (state, actions) => {
  const { resetToken, username } = actions;
  headerToken = resetToken;
  return updateObject(state, {
    ...endfetched,
    ...resetStateToken,
    username,
    resetToken,
  });
};
const authPasswordReseted = (state, actions) => {
  const { message } = actions;
  headerToken = null;
  return updateObject(state, {
    ...endfetched,
    ...resetStateToken,
    message,
  });
};
const endRequest = (state, actions) => {
  return updateObject(state, { loading: null });
};
const emptyTokens = (state, actions) => {
  headerToken = false;
  return updateObject(state, { ...resetStateToken });
};
const resultRequset = (state, actions) => {
  return updateObject(state, {
    messageTitle: actions.title,
    success: actions.success,
    message: actions.message,
  });
};
const authLogout = (state, actions) => {};
const endStartUp = (state, actions) => {
  console.log("endof");
  return updateObject(state, { isStartUp: false });
};
const emptyMessage = (state, actions) => {
  return updateObject(state, { message: null, messageTitle: null });
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case AUTH_START:
      return authStart(state, actions);
    case AUTH_SUCCESS:
      return authSuccess(state, actions);
    case AUTH_FAIL:
      return authFail(state, actions);
    case AUTH_TOKEN_CONFIRM_CODE:
      return authTokenConfirmCode(state, actions);
    case AUTH_TOKEN_RESET_PASSWORD:
      return authTokenResetPassword(state, actions);
    case AUTH_PASSWORD_RESETED:
      return authPasswordReseted(state, actions);
    case END_OF_REQUEST:
      return endRequest(state, actions);
    case EMPTY_TOKENS:
      return emptyTokens(state, actions);
    case RESULT_REQUEST:
      return resultRequset(state, actions);
    case AUTH_FORM_ERRORS:
      return authFormErrors(state, actions);
    case AUTH_LOGOUT:
      return {
        ...initialState,
        isStartUp: false,
      };
    case END_START_UP:
      return endStartUp(state, actions);
    case EMPTY_MESSAGE:
      return emptyMessage(state, actions);
  }
  return state;
};

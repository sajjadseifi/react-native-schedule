import axios from "axios";
import * as actionsType from "./actionsType";
import Storage from "react-native-storage";
import * as apiAction from "./api";
import { store } from "../store";
import AsyncStorage from "@react-native-community/async-storage";
export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const authStart = () => {
  return {
    type: actionsType.AUTH_START,
  };
};
const endOfRequest = () => {
  return {
    type: actionsType.END_OF_REQUEST,
  };
};
export const successRequest = (result, title = null) => {
  return {
    type: actionsType.RESULT_REQUEST,
    success: true,
    message: result,
    title: title,
  };
};
export const failureRequest = (error) => {
  return {
    type: actionsType.RESULT_REQUEST,
    success: false,
    message: error,
  };
};
const formErrorsResponse = (formErrors) => {
  return {
    type: actionsType.AUTH_FORM_ERRORS,
    formErrors,
  };
};
const confirmedToken = (token, expire) => {
  return {
    type: actionsType.AUTH_TOKEN_CONFIRM_CODE,
    confirmToken: token,
    expiresInConfirmCode: expire,
  };
};
const setResetToken = (token, username) => {
  return {
    type: actionsType.AUTH_TOKEN_RESET_PASSWORD,
    resetToken: token,
    username: username,
  };
};

export const authSuccess = (tokenId, username) => {
  return {
    type: actionsType.AUTH_SUCCESS,
    token: tokenId,
    username: username,
  };
};

export const authFail = (error) => {
  return {
    type: actionsType.AUTH_FAIL,
    error: error,
  };
};
export const emptyMessage = () => {
  return {
    type: actionsType.EMPTY_MESSAGE,
  };
};
export const emptyTokens = () => {
  return {
    type: actionsType.EMPTY_TOKENS,
  };
};
export const logout = () => {
  return {
    type: actionsType.AUTH_LOGOUT,
  };
};
export const logoutAct = () => async (dispatch) => {
  try {
    await storage.remove({ key: "authData" });
    await dispatch(logout());
  } catch {}
};
const authDispatch = (api, authData) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post(api, authData);

      const { data } = response;
      if (data.ok) {
        dispatch(authSuccess(data.tokenId, data.username));
        saveDataToStorage(data.tokenId, data.username);
        dispatch(successRequest(data.message, "کاربر گرامی" + data.username));
      } else dispatch(switchErrorMessage(data));
    } catch (error) {
      dispatch(faildReqTryAgane());
    } finally {
      dispatch(endOfRequest());
    }
  };
};
export const signUp = (username, email, password) => {
  return async (dispatch) => {
    const authData = { username, email, password };
    await dispatch(authDispatch(apiAction.API_URL_SIGNUP, authData));
  };
};
export const login = (username, password) => {
  return async (dispatch) => {
    const authData = { username, password };
    await dispatch(authDispatch(apiAction.API_URL_SIGNING, authData));
  };
};

export const forgetPassword = (username) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const response = await axios.post(apiAction.API_URL_FORGET_PASSWORD, {
        username,
      });

      if (response.data.ok) {
        dispatch(successRequest("کد تغییر رمز عبور به ایمیل شما ارسال شد"));
        dispatch(confirmedToken(response.data.token, response.data.expiresIn));
      } else {
        if (response.data?.formErrors?.username) {
          response.data.formErrors.forgetPassword =
            response.data.formErrors.username;
          delete response.data.formErrors.username;
        }
        dispatch(switchErrorMessage(response.data));
      }
    } catch (err) {
      dispatch(faildReqTryAgane());
    } finally {
      dispatch(endOfRequest());
    }
  };
};
export const confirmCode = (code) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const token = store.getState().auth.confirmToken;
      const headers = { token };
      const body = { code };
      const response = await axios.post(apiAction.API_URL_CONFIRM_CODE, body, {
        headers,
      });
      if (response.data.ok) {
        dispatch(setResetToken(response.data.token, response.data.username));
        dispatch(
          successRequest("هویت شما تایید شد میتوانید رمز خود را تغییر دهید")
        );
      } else dispatch(switchErrorMessage(response.data));
    } catch (err) {
      dispatch(faildReqTryAgane());
    } finally {
      dispatch(endOfRequest());
    }
  };
};

export const resetPassword = (password, confirmPassword) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const token = store.getState().auth.resetToken;
      const body = { password, confirmPassword };
      const config = { headers: { token } };
      const response = await axios.post(
        apiAction.API_URL_RESET_PASSWORD,
        body,
        config
      );
      if (response.data.ok) {
        dispatch(successRequest("رمز عبور با موفقیت تغییر یافت"));
        dispatch(emptyTokens());
      } else dispatch(switchErrorMessage(response.data));
    } catch (err) {
      dispatch(faildReqTryAgane());
    } finally {
      dispatch(endOfRequest());
    }
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    const token = AsyncStorageStatic.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = AsyncStorageStatic.getItem("userId");
      const username = AsyncStorageStatic.getItem("username");
      dispatch(authSuccess(token, userId, username));
    }
  };
};

async function saveDataToStorage(token, username) {
  return storage.save({
    key: "authData",
    data: {
      username: username,
      tokenId: token,
    },
    // expires: 60//1000 * 3600,
  });
}
const faildReqTryAgane = () => (dispatch) => {
  dispatch(failureRequest("خطا هنگام اجرای عملیات دوباره تلاش کنید"));
};
const switchErrorMessage = (data) => async (dispatch) => {
  switch (data.message) {
    case "BAD_REQUEST_DATA":
      dispatch(formErrorsResponse(data.formErrors));
      dispatch(failureRequest("فرم را به درستی پر کنید!"));
      break;
    case "LOGIN_FAILED":
      dispatch(failureRequest("نام کاربری یا رمز وارد شده اشتباه است"));
      break;
    case "USER_NOT_EXIST":
      dispatch(failureRequest("نام کاربری یاایمیل ارسال شده اشتباه است"));
      break;
    case "FAILUE_TRY_AGANE":
      dispatch(failureRequest("خطا!  دوباره تلاش کنید"));
      break;
    case "USER_TOKEN_INVALID" || "TOKEN_IS_REQIRED":
      dispatch(failureRequest("درخواست ارسال شده نامتعبر است"));
      dispatch(emptyTokens());
      break;
    case "USER_REQUEST_IS_NOT_AUTHORIZED":
      dispatch(failureRequest("شما به این بخش دسترسی ندارید"));
      dispatch(emptyTokens());
      break;
    case "CONFIRM_CODE_NOT_MATCH":
      dispatch(failureRequest("کد ارسال شده همخوانی ندارد  دوباره تلاش کنید"));
      break;
    case "BAD_REQUEST_TO_RESET_PASSWORD":
      dispatch(failureRequest("دسترسی غیر مجاز!!!"));
      dispatch(emptyTokens());
      break;
    case "FAILURE_TRY_AGAIN":
      dispatch(failureRequest("عملیات ناموفق! دوباره امتحان کنید"));
      break;
    case "USER_USERNAME_EXIST":
      dispatch(formErrorsResponse(data.formErrors));
      dispatch(failureRequest("نام کاربری مورد نظر استفاده شده"));
      break;
    case "USER_EMAIL_EXIST":
      dispatch(formErrorsResponse(data.formErrors));
      dispatch(failureRequest("ایمیل مورد نظر استفاده شده"));
      break;
  }
};

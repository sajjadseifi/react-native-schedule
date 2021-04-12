const ipv4 = "192.168.1.2";
const root = `http://${ipv4}:8080/api/`;
//auth
const rootAuth = root + "/auth";
export const API_URL_SIGNUP = `${rootAuth}/sign-up`;
export const API_URL_SIGNING = `${rootAuth}/login`;
export const API_URL_FORGET_PASSWORD = `${rootAuth}/forget-paswword`;
export const API_URL_CONFIRM_CODE = `${rootAuth}/confirm-code`;
export const API_URL_RESET_PASSWORD = `${rootAuth}/reset-password`;

//
const rootSchedule = root + "/schedules/";
export const API_URL_SCHEDULES =`${rootSchedule}`;
export const API_URL_SCHEDULES_IS_DONE =`${rootSchedule}/status/`;
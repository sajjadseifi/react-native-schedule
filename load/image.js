export let login;
export let signup;
export let forgotPassword;
export let confirmCode;
export let resetPassword;
export let cornerInside;
export let viewSchedule;
export let logout;
export let allView;
export let startup;
export function load() {
  login = require("../assets/images/login.png");
  signup = require("../assets/images/sign-up.png");
  forgotPassword = require("../assets/images/forgot-password.png");
  confirmCode = require("../assets/images/confirm-code.png");
  resetPassword = require("../assets/images/reset-password.png");
  cornerInside = require("../assets/images/corder-inside.png");
  viewSchedule = require("../assets/images/view-schedule.jpg");
  logout = require("../assets/images/log-out.png");
  allView = require("../assets/images/all-view.png");
  startup = require("../assets/images/start-up-schedule.png");
}

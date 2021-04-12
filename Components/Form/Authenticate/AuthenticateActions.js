import * as authActions from "../../../store/actions/auth";
import * as actions from "./auth.form.types";

export const changeRducerValueHandler = (
  dispatch = () => {},
  tag,
  value,
  isValid,
  clientErorr
) => {
  dispatch({
    type: actions.FROM_INPUT_UPDATE,
    tag,
    value,
    isValid,
    clientErorr,
  });
};
export async function authecticationActionsHandler(type, valuesForm, dispatch) {
  try {
    let action;
    switch (type) {
      case actions.FORM_SIGNUP:
        action = authActions.signUp(
          valuesForm.username,
          valuesForm.email,
          valuesForm.password
        );
        break;
      case actions.FORM_LOGIN:
        action = authActions.login(valuesForm.username, valuesForm.password);
        break;
      case actions.FORM_FORGETPASSWORD:
        action = authActions.forgetPassword(valuesForm.forgetPassword);
        break;
      case actions.FROM_CONFIREMD_CODE:
        action = authActions.confirmCode(valuesForm.confirmCode);
        break;
      case actions.FROM_RESET_PASSWORD:
        action = authActions.resetPassword(
          valuesForm.password,
          valuesForm.confirmPassword
        );
        break;
    }

    await dispatch(action);
  } catch (error) {
  } finally {
  }
}

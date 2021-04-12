import React from "react";
import {} from "react-native";
import InputsType, {
  PasswordInputProps,
  UsernameInputProps,
  EamilInputProps,
  ForgetPasswordProps,
  ConfirmCodeInputProps,
  ConfirmedPasswordProps,
} from "../../../Constants/InputsType";
import InputFull from "./InputFull";

const InputPack = ({ inputType, inputFullStyle, ...props }) => {
  let inputProps = {};
  switch (inputType) {
    case InputsType.Username:
      inputProps = UsernameInputProps;
      break;
    case InputsType.Email:
      inputProps = EamilInputProps;
      break;
    case InputsType.Password:
      inputProps = PasswordInputProps;
      break;
    case InputsType.ForgetPassword:
      inputProps = ForgetPasswordProps;
      break;
    case InputsType.ConfirmCode:
      inputProps = ConfirmCodeInputProps;
      break;
    case InputsType.ConfirmedPassword:
      inputProps = ConfirmedPasswordProps;
      break;
  }

  return (
    <InputFull {...props} {...inputProps} inputFullStyle={inputFullStyle} />
  );
};

export default InputPack;

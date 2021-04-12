import IconName from "./IconName";

export default {
  Username: "Username",
  Email: "Email",
  Password: "Password",
  ConfirmedPassword: "ConfirmedPassword",
  Title:"Title",
  Descibtion:"Descibtion",
  Clender:"Clender",
  Time:"Time",
  ForgetPassword:"ForgetPassword",
  ConfirmCode:"ConfirmCode",
};

export const UsernameInputProps = {
  placeholder: "نام کاربری",
  iconName: IconName.android.username,
  validate: {
    required: true,
    minlength: 3,
    maxlength: 16,
    regex:["username"]
  },
};

export const EamilInputProps = {
  placeholder: "ایمیل",
  iconName: IconName.android.mail,
  validate:{
    required: true,
    regex:["email"]
  }

};

export const PasswordInputProps = {
  placeholder: "رمز عبور",
  secureTextEntry:true,
  iconName: IconName.android.password,
  validate:{
    required: true,
    minlength: 8,
    maxlength: 20,
    regex:["password"],
  }
};

export const ConfirmedPasswordProps = {
  ...PasswordInputProps,
  secureTextEntry:true,
  placeholder: "تکرار رمز عبور",
  iconName: IconName.android.confirmKey,
};


export const ForgetPasswordProps = {
  placeholder: "نام کاربری یا ایمیل",
  iconName: IconName.android.username,
  validate: {
    required: true,
    minlength: 3,
    maxlength: 20,
    regex:["username","email"]
  },
};

export const ConfirmCodeInputProps = {
  placeholder: "کد تایید",
  iconName: IconName.android.qrcode,
  validate: {
    required: true,
    minlength: 4,
    maxlength: 6,
    regex:["confirmCode"]
  },
};


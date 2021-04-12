const validate = {
  required: false, //example true or false
  min: null, //example 2
  max: null, //example 10
  minlength: null, //example 2
  maxlength: null, //example 10
  regex: null, // example  "username" !!key of (regexPatern)
};

export const validation = (vaidate = validate, text) => {
  let isValid = true;

  isValid = isValid && requiredValidator(vaidate.required, text);

  isValid = isValid && regexValidator(vaidate.regex, text);

  isValid = isValid && minLengthValidator(vaidate.minlength, text);
  isValid = isValid && maxLengthValidator(vaidate.maxlength, text);

  isValid = isValid && minValidator(vaidate.min, text);
  isValid = isValid && maxValidator(vaidate.max, text);

  return isValid;
};

//checkRequired
export const requiredValidator = (required, text) =>
  !required || (required && text.trim().length === 0);

//ziro check
export const isZiro = (num) => num == 0;
export const isNull = (o) => !isZiro(o) && o;
//length
export const minLengthValidator = (minLength, text) =>
  isNull(minLength) || (minLength && text.length < minLength);
export const maxLengthValidator = (maxLength, text) =>
  isNull(maxLength) || (maxLength && text.length > maxLength);
//numeric
export const minValidator = (min, text) => isNull(min) || (min && +text < min);
export const maxValidator = (max, text) => isNull(max) || (max && +text > max);

//regex
export const regexPatern = {
  username: /\//,
  email: /\//,
  password: /\//,
  confirmCode: /\//,
  confirmPassword: /\//,
  forgetPassword: /\//,
};
//returned error
const regexValidator = (regex, text) => {
  for (let key of regex)
    if (regexPatern[key].test(text.toLowerCase())) return true;

  return false;
};

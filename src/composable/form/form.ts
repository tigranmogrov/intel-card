import { FormItemRule, FormRules } from "naive-ui";

import { ErrorMessages } from "@/enum/errors/errors.enum";
/* eslint-disable */
const emailRegex: RegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const smallLetterRegex: RegExp = /[a-z]/;
const largeLetterRegex: RegExp = /[A-Z]/;
const numberRegex: RegExp = /[0-9]/;
const symbolRegex: RegExp = /[-@!#$%^&*()_+|~=`{}[\]:";'<>?,./]/;
const minLength = 10;

const isRequired = (rule: FormItemRule, value: string): boolean | Error => {
  if (!value) {
    return new Error(ErrorMessages.REQUIRED);
  }
  return true;
};
const validateEmail = (rule: FormItemRule, value: string): boolean | Error => {
  if (!value) {
    return new Error(`Email is required`);
  } else if (!emailRegex.test(value)) {
    return new Error(ErrorMessages.INVALID_EMAIL);
  }
  return true;
};

const validatePassword = (
  rule: FormItemRule,
  value: string
): boolean | Error => {
  if (!value) {
    return new Error(`Password is required`);
  } else if (value.length < minLength) {
    return new Error(`Password must has a ${minLength}`);
  } else if (!largeLetterRegex.test(value)) {
    return new Error(ErrorMessages.LARGE_LETTER);
  } else if (!smallLetterRegex.test(value)) {
    return new Error(ErrorMessages.SMALL_LETTER);
  } else if (!numberRegex.test(value)) {
    return new Error(ErrorMessages.NUMBER);
  } else if (!symbolRegex.test(value)) {
    return new Error(ErrorMessages.SYMBOL);
  }
  return true;
};

const backendMessageError = (error, message) => {
  switch (error.code) {
    case "auth/invalid-email":
      message.error(ErrorMessages.INVALID_EMAIL);
      break;
    case "auth/wrong-password":
      message.error(ErrorMessages.WRONG_PASSWORD);
      break;
    case "auth/user-not-found":
      message.error(ErrorMessages.USER_NOT_FOUND);
      break;
    default:
      message.error(ErrorMessages.DEFAULT);
      break;
  }
};

export { validatePassword, validateEmail, backendMessageError };

export const rules = (): FormRules => {
  return {
    inputVal: [
      {
        required: true,
        validator: (rule, value) => isRequired(rule, value),
        trigger: ["blur"],
      },
    ],
    name: [
      {
        required: true,
        message: "Please input your name",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        validator: (rule: FormItemRule, value: string) =>
          validateEmail(rule, value),
        trigger: ["input", "blur"],
      },
    ],
    password: [
      {
        required: true,
        validator: (rule: FormItemRule, value: string) =>
          validatePassword(rule, value),
        trigger: ["input", "blur"],
      },
    ],
  };
};

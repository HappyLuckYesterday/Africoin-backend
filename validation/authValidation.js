const validator = require("validator");
const isEmpty = require("./isEmpty");

const registerValidation = (data) => {
  let errors = {};
  console.log(data);
  let email = data.email;
  let password = data.password;
  let password2 = data.password2;

  if (isEmpty(email)) errors.email = "Please enter your email";
  if (!isEmpty(email) && !validator.isEmail(email))
    errors.email = "Please check your email";
  if (isEmpty(password)) errors.password = "Please enter your password";
  if (isEmpty(password2)) errors.password2 = "Please confirm your password";
  if (password !== password2)
    errors.password2 = "Please confirm your password correctly";

  return errors;
};

const loginValidation = (data) => {
  let errors = {};

  let email = data.email;
  let password = data.password;
  if (isEmpty(email)) errors.email = "Please enter your email";
  if (!isEmpty(email) && !validator.isEmail(email))
    errors.email = "Please check your email";
  if (isEmpty(password)) errors.password = "Please enter your password";

  return errors;
};

module.exports = { registerValidation, loginValidation };

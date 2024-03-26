const joi = require("joi");

const signupSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phonenumber: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
const signinSchema = joi.object({
  phonenumber: joi.number().required().min(11),
  email: joi.string().required(),
  password: joi.string().required(),
});

const validateSignUpSchema = (data) => {
  const { error, value } = signupSchema.validate(data);
  return {
    err: error,
    value,
  };
};

const validateSignInSchema = (data) => {
  const { error, value } = signinSchema.validate(data);
  return {
    err: error,
    value,
  };
};

module.exports = {
  validateSignInSchema: validateSignInSchema,
  validateSignUpSchema: validateSignUpSchema,
};

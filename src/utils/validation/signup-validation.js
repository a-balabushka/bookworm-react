import Joi from "joi";
import createErrorObj from "./helper";

export const signUpValidation = state => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(4)
      .max(20)
      .regex(/^[a-zA-Z0-9.-]+$/)
      .required()
      .error(errors => {
        const firstError = errors[0];
        switch (firstError.type) {
          case "any.empty":
          case "any.required":
            firstError.message = "The username should not be empty.";
            break;
          case "string.min":
            firstError.message = `The username should have at least ${firstError.context.limit} characters`;
            break;
          case "string.regex.base":
            firstError.message = "The username may contain letters or numbers.";
            break;
          case "string.max":
            firstError.message = `The username should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),

    email: Joi.string()
      .email()
      .min(16)
      .max(40)
      .required()
      .error(errors => {
        const firstError = errors[0];
        switch (firstError.type) {
          case "any.empty":
          case "any.required":
            firstError.message = "Email should not be empty.";
            break;
          case "string.email":
            firstError.message = "Email should have @";
            break;
          case "string.min":
            firstError.message = `Email should have at least ${firstError.context.limit} characters`;
            break;
          case "string.max":
            firstError.message = `Email should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      })
      .optional(),

    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .error(errors => {
        const firstError = errors[0];
        switch (firstError.type) {
          case "any.empty":
          case "any.required":
            firstError.message = "Password should not be empty.";
            break;
          case "string.min":
            firstError.message = `Password should have at least ${firstError.context.limit} characters`;
            break;
          case "string.max":
            firstError.message = `Password should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      })
      .optional()
  });

  const result = Joi.validate(state, schema, { abortEarly: false });
  return result.error === null ? {} : createErrorObj(result.error.details);
};

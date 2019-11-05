import Joi from "joi";
import createErrorObj from "./helper";

export const resetPasswordValidation = state => {
  const schema = Joi.object().keys({
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
      .optional(),

    passwordConfirmation: Joi.string()
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

  const result = Joi.validate(state, schema, { abortEarly: false, allowUnknown: true });
  return result.error === null ? {} : createErrorObj(result.error.details);
};

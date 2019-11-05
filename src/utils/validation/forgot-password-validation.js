import Joi from "joi";
import createErrorObj from "./helper";

export const forgotPasswordValidation = state => {
  const schema = Joi.object().keys({
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
      .optional()
  });
  const result = Joi.validate(state, schema, { abortEarly: false });
  return result.error === null ? {} : createErrorObj(result.error.details);
};

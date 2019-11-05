import Joi from "joi";
import createErrorObj from "./helper";

export const loginValidation = state => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
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
          default:
            break;
        }
        return firstError;
      })
      .optional(),

    password: Joi.string()
      .required()
      .error(() => '"Password should not be empty.')
      .optional()
  });

  const result = Joi.validate(state, schema, { abortEarly: false });
  return result.error === null ? {} : createErrorObj(result.error.details);
};

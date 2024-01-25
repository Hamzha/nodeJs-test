import { validationResult } from "express-validator";
import { ApiError } from "./ApiError.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json(
      new ApiError(
        400,
        errors
          .array()
          .map((item) => item.msg)
          .join(", "),
        errors.array()
      )
    );
  };
};

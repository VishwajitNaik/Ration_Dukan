import { errorResponse } from "../utils/response.js";

const validateMiddleware = (
  schema,
  source = "body"
) => {

  return (req, res, next) => {

    const result = schema.safeParse(
      req[source]
    );

    if (!result.success) {

      const errors = result.error.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })
      );

      return errorResponse(
        res,
        "Validation Failed",
        400,
        errors
      );

    }

    req.validatedData = result.data;

    next();

  };

};

export default validateMiddleware;


// import { errorResponse } from "../utils/response.js";

// const validateMiddleware = (schema) => {
//   return (req, res, next) => {
//     const result = schema.safeParse(req.body);

//     if (!result.success) {
//       const errors = result.error.issues.map((issue) => ({
//         field: issue.path.join("."),
//         message: issue.message,
//       }));

//       return errorResponse(
//         res,
//         "Validation Failed",
//         400,
//         errors
//       );
//     }

//     req.validatedData = result.data;

//     next();
//   };
// };

// export default validateMiddleware;
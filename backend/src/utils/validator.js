import { ZodError } from "zod";

/**
 * Validate Request Data
 */
export const validate = (schema, data) => {
  try {
    const parsedData = schema.parse(data);

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    throw error;
  }
};
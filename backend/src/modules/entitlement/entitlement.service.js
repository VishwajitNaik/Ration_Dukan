import EntitlementScheme from "./entitlement.model.js";

export const createScheme = async (
  data
) => {
  return await EntitlementScheme.create(
    data
  );
};

export const getSchemes = async () => {
  return await EntitlementScheme.find()
    .sort({
      cardType: 1,
      commodity: 1,
      effectiveFrom: -1,
    });
};

export const updateScheme = async (
  id,
  data
) => {
  return await EntitlementScheme.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteScheme = async (
  id
) => {
  return await EntitlementScheme.findByIdAndDelete(
    id
  );
};
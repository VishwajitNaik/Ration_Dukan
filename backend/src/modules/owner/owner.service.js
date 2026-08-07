import Owner from "./owner.model.js";

/**
 * Create Owner
 */
export const createOwner = async (ownerData) => {
  return await Owner.create(ownerData);
};

/**
 * Find Owner by Mobile
 */
export const findOwnerByMobile = async (mobile) => {
  return await Owner.findOne({ mobile });
};

/**
 * Find Owner by Email
 */
export const findOwnerByEmail = async (email) => {
  return await Owner.findOne({ email });
};

/**
 * Find Owner by ID
 */
export const findOwnerById = async (ownerId) => {
  return await Owner.findById(ownerId);
};

/**
 * Update Owner
 */
export const updateOwner = async (ownerId, updateData) => {
  return await Owner.findByIdAndUpdate(
    ownerId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const ownerExists = async (mobile, email) => {
  const query = {
    $or: [
      { mobile }
    ]
  };

  if (email) {
    query.$or.push({ email });
  }

  return await Owner.findOne(query);
};
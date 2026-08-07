import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

import {
  createCard,
  updateCard,
  deleteCard,
  findById,
  findAll,
  searchCards,
  cardExists,
  countCards,
  countSearchCards,
  aadhaarExists,
  addFamilyMember,
  updateFamilyMember,
  removeFamilyMember,
  duplicateAadhaarInCard,
  getBeneficiaryRegister,
} from "./rationCard.service.js";

import {
  getPagination,
  buildPagination,
} from "../../utils/pagination.js";

/**
 * Create Ration Card
 */
export const createRationCard = async (
  req,
  res,
  next
) => {
  try {
    const data = req.validatedData;

    data.totalUnits = data.members.filter(
      (member) => member.status === "ACTIVE"
    ).length;

    data.ownerId = req.owner._id;

    const exists = await cardExists(
      req.owner._id,
      data.rcNumber
    );

    if (exists) {
      return errorResponse(
        res,
        "Ration Card already exists",
        409
      );
    }

    // const aadhaarNumbers = data.members.map(
    //     (member) => member.aadhaarNumber
    // );

    const aadhaarNumbers = data.members
  .map((member) => member.aadhaarNumber?.trim())
  .filter(Boolean);

if (aadhaarNumbers.length > 0) {
  const existingAadhaar = await aadhaarExists(
    req.owner._id,
    aadhaarNumbers
  );

  if (existingAadhaar) {
    return errorResponse(
      res,
      "One or more Aadhaar numbers are already linked to another ration card.",
      409
    );
  }
}

    //     const existingAadhaar = await aadhaarExists(
    //     req.owner._id,
    //     aadhaarNumbers
    // );

    // if (existingAadhaar) {
    // return errorResponse(
    //     res,
    //     "One or more Aadhaar numbers are already linked to another ration card.",
    //     409
    // );
    // }

    const rationCard = await createCard(data);


    const response = rationCard.toObject();

    response.members = response.members.filter(
    member => !member.isDeleted
    );

return successResponse(
    res,
    "Ration Card created successfully",
    response,
    201
);

  } catch (error) {
    next(error);
  }
};


export const updateRationCard = async (
  req,
  res,
  next
) => {
  try {

    const cardId = req.params.id;

    const ownerId = req.owner._id;

    const existingCard = await findById(
      ownerId,
      cardId
    );

    if (!existingCard) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    /**
     * If RC Number is changing,
     * check duplicate.
     */
    if (
      req.validatedData.rcNumber &&
      req.validatedData.rcNumber !== existingCard.rcNumber
    ) {

      const duplicate = await cardExists(
        ownerId,
        req.validatedData.rcNumber
      );

      if (duplicate) {
        return errorResponse(
          res,
          "RC Number already exists",
          409
        );
      }

    }

    const updatedCard = await updateCard(
      ownerId,
      cardId,
      req.validatedData
    );

    const response = updatedCard.toObject();

response.members = response.members.filter(
  member => !member.isDeleted
);


    return successResponse(
      res,
      "Ration Card updated successfully",
      response
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Delete Ration Card
 */
export const deleteRationCard = async (
  req,
  res,
  next
) => {
  try {
    const rationCard = await deleteCard(
      req.owner._id,
      req.params.id
    );

    if (!rationCard) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    return successResponse(
      res,
      "Ration Card deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Card
 */
export const getCard = async (
  req,
  res,
  next
) => {
  try {
    const rationCard = await findById(
      req.owner._id,
      req.params.id
    );

    if (!rationCard) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    return successResponse(
      res,
      "Ration Card fetched successfully",
      rationCard
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Cards
 */
export const getCards = async (
  req,
  res,
  next
) => {
  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const {
      cardType,
      cardStatus,
      keyword,
      sortBy,
      sortOrder,
    } = req.query;

    const {
      cards,
      totalRecords,
    } = await findAll({
      ownerId: req.owner._id,
      page,
      limit,
      cardType,
      cardStatus,
      keyword,
      sortBy,
      sortOrder,
    });

    const response = cards.map(card => {
  const obj = card.toObject();

  obj.members = obj.members.filter(
    member => !member.isDeleted
  );

  return obj;
});

    return successResponse(
      res,
      "Ration Cards fetched successfully",
      {
        cards: response,
        pagination: buildPagination(
          totalRecords,
          page,
          limit
        ),
      }
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Search Cards
 */
export const searchRationCards = async (
  req,
  res,
  next
) => {
  try {
    const keyword = req.query.keyword || "";

    const { page, limit, skip } =
      getPagination(req.query);

    const cards = await searchCards(
      req.owner._id,
      keyword,
      skip,
      limit
    );

    const response = cards.map(card => {
  const obj = card.toObject();

  obj.members = obj.members.filter(
    member => !member.isDeleted
  );

  return obj;
});

const totalRecords =
    await countSearchCards(
        req.owner._id,
        keyword
    );

    return successResponse(
      res,
      "Search completed",
      {
        cards : response,
        pagination: buildPagination(
          totalRecords,
          page,
          limit
        ),
      }
    );
  } catch (error) {
    next(error);
  }
};

export const addMember = async (
  req,
  res,
  next
) => {
  try {

    const ownerId = req.owner._id;

    const cardId = req.params.id;

    const member = req.validatedData;

    const card = await findById(
      ownerId,
      cardId
    );

    if (!card) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    /**
     * Only one Head allowed
     */
    if (
      member.isHead &&
      card.members.some(
  (m) => m.isHead && !m.isDeleted
)
    ) {
      return errorResponse(
        res,
        "Head of Family already exists",
        409
      );
    }

    /**
     * Duplicate Aadhaar
     */
    const duplicate =
      await aadhaarExists(
        ownerId,
        [member.aadhaarNumber]
      );

    if (duplicate) {
      return errorResponse(
        res,
        "Aadhaar already exists",
        409
      );
    }

    const duplicateInCard = duplicateAadhaarInCard(
      card,
      member.aadhaarNumber
    );

    if (duplicateInCard) {
      return errorResponse(
        res,
        "Duplicate Aadhaar number is not allowed in the same ration card.",
        409
      );
    }

    const updatedCard =
      await addFamilyMember(
        ownerId,
        cardId,
        member
      );

    return successResponse(
      res,
      "Family member added successfully",
      updatedCard
    );

  } catch (error) {
    next(error);
  }
};

export const updateMember = async (
  req,
  res,
  next
) => {
  try {

    const ownerId = req.owner._id;

    const { id, memberId } = req.params;

    const data = req.validatedData;

    const card = await findById(
      ownerId,
      id
    );

    if (!card) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    const existingMember =
      card.members.id(memberId);

    if (!existingMember || existingMember.isDeleted) {
      return errorResponse(
        res,
        "Family member not found",
        404
      );
    }

    const duplicateInCard = duplicateAadhaarInCard(
  card,
  data.aadhaarNumber,
  memberId
);

if (duplicateInCard) {
  return errorResponse(
    res,
    "Duplicate Aadhaar number is not allowed in the same ration card.",
    409
  );
}

    /**
     * Aadhaar Duplicate Check
     */
    if (
      data.aadhaarNumber &&
      data.aadhaarNumber !==
      existingMember.aadhaarNumber
    ) {

      const duplicate =
        await aadhaarExists(
          ownerId,
          [data.aadhaarNumber],
          id
        );

      if (duplicate) {
        return errorResponse(
          res,
          "Aadhaar already exists",
          409
        );
      }

    }

    /**
     * Prevent Multiple Heads
     */
    if (data.isHead === true) {

    const anotherHead =
    card.members.find(
        m =>
            m.isHead &&
            !m.isDeleted &&
            m._id.toString() !== memberId
    );

      if (anotherHead) {
        return errorResponse(
          res,
          "Head of Family already exists",
          409
        );
      }

    }

    const updated =
      await updateFamilyMember(
        ownerId,
        id,
        memberId,
        data
      );

    return successResponse(
      res,
      "Family member updated successfully",
      updated
    );

  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (
  req,
  res,
  next
) => {
  try {

    const ownerId = req.owner._id;

    const cardId = req.params.id;

    const memberId = req.params.memberId;

    const card = await findById(
      ownerId,
      cardId
    );

    if (!card) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    const member =
      card.members.id(memberId);

    if (!member || member.isDeleted) {
      return errorResponse(
        res,
        "Family member not found",
        404
      );
    }

    /**
     * Cannot delete Head
     */
    if (member.isHead) {
      return errorResponse(
        res,
        "Head of Family cannot be deleted",
        409
      );
    }

    /**
     * Card must contain at least one member
     */

    const activeMembers =
    card.members.filter(
        member => !member.isDeleted
    );
    
    if (activeMembers.length <= 1) {
      return errorResponse(
        res,
        "At least one family member is required",
        409
      );
    }

    const updatedCard =
      await removeFamilyMember(
        ownerId,
        cardId,
        memberId
      );

    return successResponse(
      res,
      "Family member removed successfully",
      updatedCard
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Beneficiary Register
 */
export const getBeneficiaryRegisterController = async (
  req,
  res,
  next
) => {
  try {

    const {
      cardStatus,
      cardType,
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.validatedData;

    const register =
      await getBeneficiaryRegister({
        ownerId: req.owner._id,
        cardStatus,
        cardType,
        search,
        page,
        limit,
        sortBy,
        sortOrder,
      });

    return successResponse(
      res,
      "Beneficiary register fetched successfully",
      register
    );

  } catch (error) {

    next(error);

  }
};

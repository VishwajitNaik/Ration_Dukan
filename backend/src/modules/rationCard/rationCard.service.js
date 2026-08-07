import RationCard from "./rationCard.model.js";
import Distribution from "../distribution/distribution.model.js";

/**
 * Private Search Query Builder
 */
const buildSearchQuery = (ownerId, keyword) => ({
  ownerId,
  isDeleted: false,
  $or: [
    {
      rcNumber: {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      "members.name": {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      "members.aadhaarNumber": {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      "members.mobile": {
        $regex: keyword,
        $options: "i",
      },
    },
  ],
});

/**
 * Create Ration Card
 */
export const createCard = async (cardData) => {
  return await RationCard.create(cardData);
};

/**
 * Update Ration Card
 */
export const updateCard = async (
  ownerId,
  cardId,
  updateData
) => {
  return await RationCard.findOneAndUpdate(
    {
      _id: cardId,
      ownerId,
      isDeleted: false,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Soft Delete Card
 */
export const deleteCard = async (
  ownerId,
  cardId
) => {
  return await RationCard.findOneAndUpdate(
    {
      _id: cardId,
      ownerId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

/**
 * Find Card by ID
 */
export const findById = async (
  ownerId,
  cardId
) => {
  return await RationCard.findOne({
    _id: cardId,
    ownerId,
    isDeleted: false,
  });
};

/**
 * Find Card by RC Number
 */
export const findByRCNumber = async (
  ownerId,
  rcNumber
) => {
  return await RationCard.findOne({
    ownerId,
    rcNumber,
    isDeleted: false,
  });
};

/**
 * Find All Cards
 */
export const findAll = async ({
  ownerId,
  page = 1,
  limit = 10,
  cardType,
  cardStatus,
  keyword,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {

  const query = {
    ownerId,
    isDeleted: false,
  };

  if (cardType) {
    query.cardType = cardType;
  }

  if (cardStatus) {
    query.cardStatus = cardStatus;
  }

  if (keyword) {
    query.$or = [
      {
        rcNumber: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        "members.name": {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        "members.aadhaarNumber": {
          $regex: keyword,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const cards = await RationCard.find(query)
    .sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(limit);

  const totalRecords =
    await RationCard.countDocuments(query);

  return {
    cards,
    totalRecords,
  };
};

/**
 * Search Cards
 */
// export const searchCards = async (
//   ownerId,
//   keyword,
//   skip = 0,
//   limit = 10
// ) => {
//   return await RationCard.find({
//     ownerId,
//     isDeleted: false,
//     $or: [
//       {
//         rcNumber: {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.name": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.aadhaarNumber": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.mobile": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//     ],
//   })
//     .sort({
//       createdAt: -1,
//     })
//     .skip(skip)
//     .limit(limit);
// };

export const searchCards = async (
  ownerId,
  keyword,
  skip = 0,
  limit = 10
) => {
  return await RationCard.find(
    buildSearchQuery(ownerId, keyword)
  )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

/**
 * Check Card Exists
 */
export const cardExists = async (
  ownerId,
  rcNumber
) => {
  return await RationCard.exists({
    ownerId,
    rcNumber,
    isDeleted: false,
  });
};

/**
 * Count Cards
 */
export const countCards = async (
  ownerId
) => {
  return await RationCard.countDocuments({
    ownerId,
    isDeleted: false,
  });
};

export const countSearchCards = async (
  ownerId,
  keyword
) => {
  return await RationCard.countDocuments(
    buildSearchQuery(ownerId, keyword)
  );
};

/**
 * Check Aadhaar Exists
 */
export const aadhaarExists = async (
  ownerId,
  aadhaarNumbers,
  excludeCardId = null
) => {

    aadhaarNumbers = aadhaarNumbers.filter(Boolean);

  if (aadhaarNumbers.length === 0) {
    return null;
  }

  const query = {
    ownerId,
    isDeleted: false,
    members: {
      $elemMatch: {
        aadhaarNumber: {
          $in: aadhaarNumbers,
        },
        isDeleted: false,
      },
    },
  };

  if (excludeCardId) {
    query._id = {
      $ne: excludeCardId,
    };
  }

  return await RationCard.findOne(query);
};

/**
 * Check duplicate Aadhaar within the same ration card
 */
export const duplicateAadhaarInCard = (
  card,
  aadhaarNumber,
  excludeMemberId = null
) => {
  if (!aadhaarNumber) {
    return null;
  }

  return card.members.find(
    (member) =>
      !member.isDeleted &&
      member.aadhaarNumber === aadhaarNumber &&
      (!excludeMemberId ||
        member._id.toString() !== excludeMemberId)
  );
};

/**
 * Add Family Member
 */
export const addFamilyMember = async (
  ownerId,
  cardId,
  member
) => {

  const card = await RationCard.findOne({
    _id: cardId,
    ownerId,
    isDeleted: false,
  });

  if (!card) {
    return null;
  }

  card.members.push(member);

  card.totalUnits = card.members.filter(
    (m) => m.status === "ACTIVE" &&
    !m.isDeleted
  ).length;

  await card.save();

  return card;

};



/**
 * Update Family Member
 */
export const updateFamilyMember = async (
  ownerId,
  cardId,
  memberId,
  updateData
) => {

  const card = await RationCard.findOne({
    _id: cardId,
    ownerId,
    isDeleted: false,
  });

  if (!card) {
    return null;
  }

  const member = card.members.id(memberId);

    if (!member || member.isDeleted) {
    return null;
    }

  Object.assign(member, updateData);

  card.totalUnits = card.members.filter(
    (m) => m.status === "ACTIVE" &&
    !m.isDeleted
  ).length;

  await card.save();

  return card;
};

/**
 * Remove Family Member
 */
export const removeFamilyMember = async (
  ownerId,
  cardId,
  memberId
) => {

  const card = await RationCard.findOne({
    _id: cardId,
    ownerId,
    isDeleted: false,
  });

  if (!card) {
    return null;
  }

  const member = card.members.id(memberId);

    if (!member || member.isDeleted) {
    return null;
    }

//   member.deleteOne();

member.isDeleted = true;
member.deletedAt = new Date();

  card.totalUnits = card.members.filter(
    (m) => m.status === "ACTIVE" &&
    !m.isDeleted
  ).length;

  await card.save();

  return card;

};

/**
 * Beneficiary Register
 */
export const getBeneficiaryRegister = async ({
  ownerId,
  cardStatus,
  cardType,
  search,
  page,
  limit,
  sortBy,
  sortOrder,
}) => {

  const match = {
    ownerId,
    isDeleted: false,
  };

  if (cardStatus) {
    match.cardStatus = cardStatus;
  }

  if (cardType) {
    match.cardType = cardType;
  }

  if (search) {

    match.$or = [

      {
        rcNumber: {
          $regex: search,
          $options: "i",
        },
      },

      {
        headOfFamily: {
          $regex: search,
          $options: "i",
        },
      },

    ];

  }

  const sort = {
    [sortBy]:
      sortOrder === "asc"
        ? 1
        : -1,
  };

  const skip =
    (page - 1) * limit;

  const pipeline = [

    {
      $match: match,
    },

    /**
     * Latest Distribution
     */
    {
      $lookup: {

        from: "distributions",

        let: {
          rationCardId: "$_id",
        },

        pipeline: [

          {
            $match: {

              $expr: {

                $and: [

                  {
                    $eq: [
                      "$rationCardId",
                      "$$rationCardId",
                    ],
                  },

                  {
                    $eq: [
                      "$isDeleted",
                      false,
                    ],
                  },

                ],

              },

            },

          },

          {
            $sort: {
              distributionDate: -1,
            },
          },

          {
            $limit: 1,
          },

        ],

        as: "lastDistribution",

      },

    },

    /**
     * Flatten
     */
{
  $addFields: {

    lastDistribution: {
      $first: "$lastDistribution",
    },

totalMembers: {
  $size: {
    $filter: {
      input: "$members",
      as: "member",
      cond: {
        $and: [
          { $eq: ["$$member.isDeleted", false] },
          { $eq: ["$$member.status", "ACTIVE"] }
        ]
      }
    }
  }
},

    headOfFamily: {
      $first: {
        $filter: {
          input: "$members",
          as: "member",
          cond: {
            $eq: [
              "$$member.isHead",
              true,
            ],
          },
        },
      },
    },

  },

},

    /**
     * Required Fields
     */
    {
      $project: {

        _id: 0,

        rcNumber: 1,

        headOfFamily: "$headOfFamily.name",  // Change this if your schema uses another field name

        cardType: 1,

        cardStatus: 1,

        totalMembers: 1,

        lastDistributionDate:
          "$lastDistribution.distributionDate",

        collectedBy:
          "$lastDistribution.collectedBy",

      },

    },

    {
      $sort: sort,
    },

    {
      $facet: {

        register: [

          {
            $skip: skip,
          },

          {
            $limit: limit,
          },

        ],

        totalRecords: [

          {
            $count: "count",
          },

        ],

      },

    },

  ];

  const result =
    await RationCard.aggregate(
      pipeline
    );

  const register =
    result[0].register;

  const totalRecords =
    result[0].totalRecords[0]
      ?.count || 0;

  return {

    register,

    pagination: {

      page,

      limit,

      totalRecords,

      totalPages:
        Math.ceil(
          totalRecords /
            limit
        ),

      hasPrevious:
        page > 1,

      hasNext:
        page <
        Math.ceil(
          totalRecords /
            limit
        ),

    },

  };

};

/**
 * Count Search Results
 */
// export const countSearchCards = async (

//   ownerId,
//   keyword
// ) => {
//   return await RationCard.countDocuments({
//     ownerId,
//     isDeleted: false,
//     $or: [
//       {
//         rcNumber: {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.name": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.aadhaarNumber": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//       {
//         "members.mobile": {
//           $regex: keyword,
//           $options: "i",
//         },
//       },
//     ],
//   });
// };
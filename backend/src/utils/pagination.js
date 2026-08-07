/**
 * Get Pagination Data
 */

export const getPagination = (query) => {
  let page = parseInt(query.page) || 1;

  let limit = parseInt(query.limit) || 10;

  if (page < 1) page = 1;

  if (limit < 1) limit = 10;

  if (limit > 100) limit = 100;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

/**
 * Build Pagination Response
 */

export const buildPagination = (
  totalRecords,
  page,
  limit
) => {
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    page,
    limit,
    totalRecords,
    totalPages,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  };
};
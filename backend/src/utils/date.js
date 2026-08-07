import dayjs from "dayjs";

/**
 * Format Date
 * Example: 02-08-2026
 */
export const formatDate = (
  date = new Date(),
  format = "DD-MM-YYYY"
) => {
  return dayjs(date).format(format);
};

/**
 * Format Date & Time
 * Example: 02-08-2026 09:45 AM
 */
export const formatDateTime = (
  date = new Date(),
  format = "DD-MM-YYYY hh:mm A"
) => {
  return dayjs(date).format(format);
};

/**
 * Get Current Date
 */
export const getCurrentDate = () => {
  return dayjs().toDate();
};

/**
 * Get Current Month
 * Example: 8
 */
export const getCurrentMonth = () => {
  return dayjs().month() + 1;
};

/**
 * Get Current Year
 * Example: 2026
 */
export const getCurrentYear = () => {
  return dayjs().year();
};

/**
 * Get Current Month Name
 * Example: August
 */
export const getCurrentMonthName = () => {
  return dayjs().format("MMMM");
};

/**
 * Check if Two Dates are Same Day
 */
export const isSameDay = (date1, date2) => {
  return dayjs(date1).isSame(dayjs(date2), "day");
};
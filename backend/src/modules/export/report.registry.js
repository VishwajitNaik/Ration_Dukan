import { getStockRegister } from "../stock/stock.service.js";
import { getBeneficiaryRegister } from "../rationCard/rationCard.service.js";
import { getCommoditySummaryReport } from "../stock/stock.service.js";
import { getMonthlyGovernmentReport } from "../reports/reports.service.js";

export const reportServices = {
  STOCK_REGISTER: getStockRegister,
  BENEFICIARY_REGISTER: getBeneficiaryRegister,
  COMMODITY_SUMMARY: getCommoditySummaryReport,
  MONTHLY_GOVERNMENT: getMonthlyGovernmentReport,
};
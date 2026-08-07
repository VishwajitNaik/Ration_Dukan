import { generateStockRegisterPdf } from "./templates/stockRegister.template.js";
import { generateBeneficiaryRegisterPdf } from "./templates/beneficiaryRegister.template.js";
import { generateGovernmentReportPdf } from "./templates/governmentReport.template.js";
import { generateCommoditySummaryPdf } from "./templates/commoditySummary.template.js";
import { generateDashboardPdf } from "./templates/dashboard.template.js";

export const pdfTemplates = {

  STOCK_REGISTER: generateStockRegisterPdf,

  BENEFICIARY_REGISTER: generateBeneficiaryRegisterPdf,

  MONTHLY_GOVERNMENT: generateGovernmentReportPdf,

  COMMODITY_SUMMARY: generateCommoditySummaryPdf,

  DASHBOARD: generateDashboardPdf,

};
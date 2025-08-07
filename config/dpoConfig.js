import dotenv from "dotenv";
dotenv.config();

// DPO payment configuration
export const DPO_CONFIG = {
  companyToken: process.env.DPO_COMPANY_TOKEN,
  serviceType: process.env.DPO_SERVICE_TYPE,
  endpoint: process.env.DPO_ENDPOINT,
  paymentUrl: process.env.DPO_PAYMENT_URL,
};
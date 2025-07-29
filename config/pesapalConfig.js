import dotenv from 'dotenv';
dotenv.config();

export const pesapalConfig = {
  consumerKey: process.env.PESAPAL_CONSUMER_KEY,
  consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
  baseUrl: process.env.PESAPAL_BASE_URL,
  callbackUrl: process.env.PESAPAL_CALLBACK_URL,
};

export const getPesapalUrl = (endpoint) => {
  const endpoints = {
    token: "/api/Auth/RequestToken",
    registerIPN: "/api/URLSetup/RegisterIPN",
    submitOrder: "/api/Transactions/SubmitOrderRequest",
    transactionStatus: "/api/Transactions/GetTransactionStatus",
  };

  return `${pesapalConfig.baseUrl}${endpoints[endpoint]}`;
};



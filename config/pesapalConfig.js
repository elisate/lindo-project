import dotenv from 'dotenv';
dotenv.config();

export const pesapalConfig = {
  baseUrl: 'https://cybqa.pesapal.com',
  consumerKey: process.env.PESAPAL_CONSUMER_KEY,
  consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
  currency: 'RWF',
  country: 'RW',
  ipnUrl: process.env.PESAPAL_IPN_URL || 'https://your-domain.com/api/pesapal/ipn',
  endpoints: {
    token: '/pesapalv3/api/Auth/RequestToken',
    submitOrder: '/pesapalv3/api/Transactions/SubmitOrderRequest',
    getTransactionStatus: '/pesapalv3/api/Transactions/GetTransactionStatus',
    getMerchantOrderStatus: '/pesapalv3/api/Transactions/GetMerchantOrderStatus',
    registerIPN: '/pesapalv3/api/URLSetup/RegisterIPN'
  }
};

export const getPesapalUrl = (key) => {
  const endpoint = pesapalConfig.endpoints[key];
  if (!endpoint) throw new Error(`Invalid Pesapal endpoint key: ${key}`);
  return `${pesapalConfig.baseUrl}${endpoint}`;
};

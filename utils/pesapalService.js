import axios from 'axios';
import { pesapalConfig, getPesapalUrl } from '../config/pesapalConfig.js';
import qs from 'querystring';

// 1. Get Access Token
export const getAccessToken = async () => {
  const credentials = {
    consumer_key: pesapalConfig.consumerKey,
    consumer_secret: pesapalConfig.consumerSecret
  };

  const url = getPesapalUrl('token');
  const response = await axios.post(url, credentials);
  return response.data.token;
};

// 2. Submit Order
export const submitPesapalOrder = async ({ amount, currency, email, phone, firstName, lastName, callbackUrl }) => {
  const token = await getAccessToken();

  const body = {
    id: '', // leave empty
    currency,
    amount,
    description: 'Order payment',
    callback_url: callbackUrl,
    notification_id: '', // use IPN registration if needed
    billing_address: {
      email_address: email,
      phone_number: phone,
      country_code: pesapalConfig.country,
      first_name: firstName,
      last_name: lastName,
    }
  };

  const response = await axios.post(getPesapalUrl('submitOrder'), body, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};

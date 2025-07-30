import axios from 'axios';
import { pesapalConfig, getPesapalUrl } from '../config/pesapalConfig.js';
import qs from 'querystring';

export const getAccessToken = async () => {
  const url = getPesapalUrl('token');
  const credentials = {
    consumer_key: pesapalConfig.consumerKey,
    consumer_secret: pesapalConfig.consumerSecret,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await axios.post(url, qs.stringify(credentials), { headers });
  return response.data?.token;
};

export const registerIPN = async () => {
  const token = await getAccessToken();
  const url = getPesapalUrl('register_ipn');

  const payload = {
    url: pesapalConfig.notificationUrl,
    ipn_notification_type: 'GET',
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(url, payload, { headers });
  return response.data?.ipn_id;
};

export const submitPesapalOrder = async (orderData) => {
  const token = await getAccessToken();
  const url = getPesapalUrl('submit_order');

  const payload = {
    id: orderData.orderID,
    currency: orderData.currency || 'RWF',
    amount: orderData.amount,
    description: 'Purchase at Lindos ',
    callback_url: pesapalConfig.callbackUrl,
    notification_id: orderData.ipn_id,
    billing_address: {
      email_address: orderData.email,
      phone_number: orderData.phone,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
    },
    merchant_reference: orderData.merchant_reference, // ✅ REQUIRED
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
};

import axios from "axios";
import { pesapalConfig, getPesapalUrl } from "../config/pesapalConfig.js";

let cachedToken = null;

export const getAccessToken = async () => {
  if (cachedToken) return cachedToken;

  const url = getPesapalUrl("token");
  const auth = {
    consumer_key: pesapalConfig.consumerKey,
    consumer_secret: pesapalConfig.consumerSecret,
  };

  try {
    const res = await axios.post(url, auth);
    cachedToken = res.data.token;
    return cachedToken;
  } catch (error) {
    console.error("AccessToken Error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerIPN = async () => {
  const url = getPesapalUrl("registerIPN");
  const token = await getAccessToken();

  try {
    const res = await axios.post(
      url,
      {
        url: pesapalConfig.callbackUrl,
        ipn_notification_type: "GET",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("IPN Register Error:", error.response?.data || error.message);
    throw error;
  }
};

export const submitPesapalOrder = async (orderData) => {
  const url = getPesapalUrl("submitOrder");
  const token = await getAccessToken();

  const payload = {
    id: orderData.orderID,
    currency: orderData.currency || "RWF",
    amount: orderData.amount,
    description: "Purchase at Future Focus Rwanda",
    callback_url: pesapalConfig.callbackUrl,
    notification_id: orderData.ipn_id, // This must come from registerIPN
    billing_address: {
      email_address: orderData.email,
      phone_number: orderData.phone,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
    },
  };

  try {
    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Pesapal Error:", error.response?.data || error.message);
    throw error;
  }
};

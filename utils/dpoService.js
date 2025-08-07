// services/dpoService.js
import axios from "axios";
import { DPO_CONFIG } from "../config/dpoConfig.js";
import { Builder } from "xml2js";
import { buildDpoPayload } from "../utils/buildDpoPayload.js";

export const createPaymentToken = async (paymentData) => {
  try {
    // Build DPO payload if needed
    const dpoPayload = paymentData.Transaction ? paymentData : buildDpoPayload(paymentData);

    const builder = new Builder({ headless: true });
    const xml = builder.buildObject({ API3G: dpoPayload });

    console.log("📤 XML Sent to DPO:");
    console.log(xml);

    const res = await axios.post(`${DPO_CONFIG.endpoint}transact`, xml, {
      headers: {
        "Content-Type": "text/xml",
      },
    });

    const responseText = res.data;
    console.log("✅ Raw DPO XML Response:", responseText);

    // Extract TransToken from XML response using regex
    const tokenMatch = responseText.match(/<TransToken>(.*?)<\/TransToken>/);
    const token = tokenMatch ? tokenMatch[1] : null;

    return {
      TransToken: token,
      raw: responseText,
    };
  } catch (err) {
    console.error("❌ DPO Error:", err.response?.data || err.message, err.stack);
    throw err;
  }
};

export const verifyPaymentToken = async (token) => {
  const payload = {
    CompanyToken: DPO_CONFIG.companyToken,
    TransactionToken: token,
  };

  const res = await axios.post(`${DPO_CONFIG.endpoint}verify`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getPaymentRedirectUrl = (token) => {
  return `${DPO_CONFIG.paymentUrl}${token}`;
};

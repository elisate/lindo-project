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
    API3G: {
      CompanyToken: DPO_CONFIG.companyToken,
      Request: "verifyToken",
      TransactionToken: token,
    },
  };

  const builder = new Builder({ headless: true });
  const xmlPayload = builder.buildObject(payload);

  const res = await axios.post(`${DPO_CONFIG.endpoint}verify`, xmlPayload, {
    headers: { "Content-Type": "text/xml" },
  });

  const xml = res.data;

  // Optional: Use regex to extract values quickly
  const resultMatch = xml.match(/<Result>(.*?)<\/Result>/);
  const explanationMatch = xml.match(/<ResultExplanation>(.*?)<\/ResultExplanation>/);

  return {
    Result: resultMatch ? resultMatch[1] : null,
    ResultExplanation: explanationMatch ? explanationMatch[1] : "Unknown",
    RawResponse: xml,
  };
};

export const getPaymentRedirectUrl = (token) => {
  return `${DPO_CONFIG.paymentUrl}${token}`;
};

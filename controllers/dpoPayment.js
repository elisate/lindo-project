import {
  createPaymentToken,
  getPaymentRedirectUrl,
} from "../utils/dpoService.js";
import { DPO_CONFIG } from "../config/dpoConfig.js";

export const initiateDpoPayment = async (req, res) => {
  try {
    const {
      totalAmount,
      currency = "RWF",
      email,
      phone,
      firstName,
      lastName,
      serviceDescription = "Payment for service",
      callbackUrl = "https://lindocae-frontend.vercel.app/payment/success",
    } = req.body;

    // ✅ Validation
    if (!totalAmount || !email || !phone || !firstName) {
      return res.status(400).json({
        message: "Missing required fields: totalAmount, email, phone, or firstName",
      });
    }

  // in initiateDpoPayment controller
const paymentData = {
  orderId: `TX-${Date.now()}`,
  totalAmount,
  currency,
  customerName: firstName,
  customerLastName: lastName || "",
  customerEmail: email,
  customerPhone: phone,
  redirectUrl: callbackUrl,
  backUrl: "https://lindocae-frontend.vercel.app/payment/cancel",
  serviceType: DPO_CONFIG.serviceType,
  serviceDescription,
};

const dpoResponse = await createPaymentToken(paymentData);




    const token = dpoResponse?.TransToken;
    if (!token) {
      return res
        .status(500)
        .json({ message: "Failed to generate DPO payment token" });
    }

    const redirectUrl = getPaymentRedirectUrl(token);

    res.status(200).json({
      message: "Payment token created successfully",
      token,
      redirectUrl,
    });
  } catch (error) {
    console.error("DPO payment initiation failed:", error.message);
    res.status(500).json({
      message: "Failed to initiate payment",
      error: error.message,
    });
  }
};

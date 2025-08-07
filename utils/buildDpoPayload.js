// utils/buildDpoPayload.js
export const buildDpoPayload = (data) => {
  const {
    orderId,
    totalAmount,
    currency = "RWF",
    customerName,
    customerLastName = ".",    // <-- allow passing lastName, default to "."
    customerEmail,
    customerPhone,
    redirectUrl,
    backUrl,
    serviceType = "54842",
  } = data;

  if (!totalAmount) {
    throw new Error("Missing totalAmount for DPO Transaction");
  }

  if (!customerName) {
    throw new Error("Missing customerName for DPO Transaction");
  }

  const today = new Date().toISOString().split("T")[0];
  const formattedAmount = parseFloat(totalAmount).toFixed(2);

  return {
    CompanyToken: process.env.DPO_COMPANY_TOKEN,
    Request: "createToken",
    Transaction: {
      TransactionType: "Purchase",
      PaymentAmount: formattedAmount,
      PaymentCurrency: currency,
      CompanyRef: orderId,
      RedirectURL: redirectUrl,
      BackURL: backUrl,
      CustomerFirstName: customerName,
      CustomerLastName: customerLastName,
      CustomerPhone: customerPhone,
      CustomerEmail: customerEmail,
    },
    Services: {
      Service: {
        ServiceType: serviceType,
        ServiceDescription: `Payment for order ${orderId}`,
        ServiceDate: today,
      },
    },
  };
};

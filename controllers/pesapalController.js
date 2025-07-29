import Order from '../models/orderModel.js';
import { submitPesapalOrder } from '../utils/pesapalService.js';
import { registerIPN } from "../utils/pesapalService.js";
// Utility to map Pesapal status to internal order status
const getMappedStatus = (status) => {
  const statusMap = {
    COMPLETED: { orderStatus: 'paid', pesapalStatus: 'COMPLETED' },
    FAILED: { orderStatus: 'cancelled', pesapalStatus: 'FAILED' },
    CANCELLED: { orderStatus: 'cancelled', pesapalStatus: 'CANCELLED' },
  };
  return statusMap[status] || { orderStatus: 'pending', pesapalStatus: 'PENDING' };
};

// Main payment initiation handler
export const initiatePayment = async (req, res) => {
  try {
    // 1. Register IPN (ideally once — you can cache the result)
    const ipnData = await registerIPN();

    // 2. Add IPN ID to the order
    const order = {
      orderID: req.body.orderID,
      amount: req.body.amount,
      currency: "RWF",
      phone: req.body.phone,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ipn_id: ipnData.ipn_id, // REQUIRED!
    };

    // 3. Submit the Order
    const response = await submitPesapalOrder(order);

    return res.status(200).json({
      success: true,
      message: "Payment initiated successfully.",
      redirect_url: response.redirect_url,
      tracking_id: response.order_tracking_id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment.",
      error: error.response?.data || error.message,
    });
  }
};

// Step 4: Pesapal Callback Handler (after payment UI)
export const pesapalCallback = async (req, res) => {
  try {
    const {
      pesapal_merchant_reference,
      pesapal_transaction_tracking_id,
      pesapal_payment_status_description,
    } = req.query;

    if (!pesapal_merchant_reference) {
      return res.status(400).json({ success: false, message: 'Missing merchant reference.' });
    }

    const order = await Order.findOne({ pesapalMerchantRequestId: pesapal_merchant_reference });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const { orderStatus, pesapalStatus } = getMappedStatus(pesapal_payment_status_description);

    order.status = orderStatus;
    order.pesapalPaymentStatus = pesapalStatus;
    order.pesapalOrderTrackingId = pesapal_transaction_tracking_id;
    await order.save();

    return res.redirect(`${process.env.FRONTEND_URL}/payment/status?status=${pesapalStatus}&orderId=${order._id}`);
  } catch (error) {
    console.error('Pesapal Callback Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Pesapal callback failed.',
      error: error.message,
    });
  }
};


// IPN Handler
// Step 5: IPN Notification Listener
export const handleIPN = async (req, res) => {
  try {
    const {
      pesapal_merchant_reference,
      pesapal_transaction_tracking_id,
      pesapal_payment_status_description,
    } = req.body;

    if (!pesapal_merchant_reference) {
      return res.status(400).json({ success: false, message: 'Missing merchant reference.' });
    }

    const order = await Order.findOne({ pesapalMerchantRequestId: pesapal_merchant_reference });
    if (!order) {
      console.warn(`No order found for merchant reference: ${pesapal_merchant_reference}`);
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const { orderStatus, pesapalStatus } = getMappedStatus(pesapal_payment_status_description);

    order.status = orderStatus;
    order.pesapalPaymentStatus = pesapalStatus;
    order.pesapalOrderTrackingId = pesapal_transaction_tracking_id;
    await order.save();

    console.log(`IPN processed: Order ${order._id} updated to ${orderStatus}`);
    return res.status(200).json({ success: true, message: 'IPN processed successfully.' });
  } catch (error) {
    console.error('Pesapal IPN Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to process IPN.',
      error: error.message,
    });
  }
};


// import { queryPaymentStatus } from '../utils/pesapalService.js';

export const checkPesapalPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order || !order.pesapalOrderTrackingId) {
      return res.status(404).json({ success: false, message: 'Order or tracking ID not found.' });
    }

    const result = await queryPaymentStatus({
      merchantReference: order.pesapalMerchantRequestId,
      trackingId: order.pesapalOrderTrackingId,
    });

    const { orderStatus, pesapalStatus } = getMappedStatus(result.status_description);
    order.status = orderStatus;
    order.pesapalPaymentStatus = pesapalStatus;
    await order.save();

    return res.status(200).json({ success: true, status: pesapalStatus });
  } catch (error) {
    console.error('Query Status Error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to query payment status.', error: error.message });
  }
};

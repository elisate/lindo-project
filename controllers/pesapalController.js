import Order from '../models/orderModel.js';
import { submitPesapalOrder } from '../utils/pesapalService.js';

/**
 * Map payment status from Pesapal to your order status
 */
const getMappedStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case 'COMPLETED':
      return { orderStatus: 'paid', pesapalStatus: 'COMPLETED' };
    case 'FAILED':
    case 'CANCELLED':
      return { orderStatus: 'cancelled', pesapalStatus: paymentStatus };
    default:
      return { orderStatus: 'pending', pesapalStatus: 'PENDING' };
  }
};

/**
 * Initialize Pesapal Payment
 */
export const initiatePayment = async (req, res) => {
  try {
    const {
      orderID,
      amount,
      currency,
      phone,
      email,
      firstName,
      lastName,
    } = req.body;

    // Validate required fields
    if (!orderID || !amount || !currency || !phone || !email || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required payment fields' });
    }

    // Find the order by ID
    const order = await Order.findById(orderID);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Prepare payment data
    const paymentData = {
      amount,
      currency,
      phone,
      email,
      firstName,
      lastName,
      callbackUrl: `${req.protocol}://${req.get('host')}/api/pesapal/callback`, // Your callback endpoint
      description: `Payment for order ${orderID}`,
    };

    // Submit order to Pesapal
    const pesapalResponse = await submitPesapalOrder(paymentData);

    // Save Pesapal details to order
    order.pesapalOrderTrackingId = pesapalResponse.order_tracking_id;
    order.pesapalMerchantRequestId = pesapalResponse.merchant_reference;
    order.pesapalRedirectUrl = pesapalResponse.redirect_url;
    order.paymentMethod = 'pesapal';
    await order.save();

    return res.status(200).json({
      message: 'Payment initiated successfully',
      redirectUrl: pesapalResponse.redirect_url,
      orderTrackingId: pesapalResponse.order_tracking_id,
    });
  } catch (error) {
    console.error('Pesapal Error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
  }
};

/**
 * Handle Pesapal Callback
 */
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

    await Order.findByIdAndUpdate(order._id, {
      status: orderStatus,
      pesapalPaymentStatus: pesapalStatus,
      pesapalOrderTrackingId: pesapal_transaction_tracking_id,
    });

    // Redirect to your frontend payment status page
    return res.redirect(`${process.env.FRONTEND_URL}/payment/status?status=${pesapalStatus}&orderId=${order._id}`);
  } catch (error) {
    console.error('Pesapal callback error:', error);
    return res.status(500).json({ success: false, message: 'Pesapal callback failed.', error: error.message });
  }
};

/**
 * Handle IPN notifications from Pesapal
 */
export const handleIPN = async (req, res) => {
  try {
    const {
      pesapal_merchant_reference,
      pesapal_transaction_tracking_id,
      pesapal_payment_status_description,
    } = req.body;

    console.log('Pesapal IPN received:', req.body);

    if (!pesapal_merchant_reference) {
      return res.status(400).json({ success: false, message: 'Missing merchant reference' });
    }

    const order = await Order.findOne({ pesapalMerchantRequestId: pesapal_merchant_reference });
    if (!order) {
      console.log(`No order found for merchant ref: ${pesapal_merchant_reference}`);
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const { orderStatus, pesapalStatus } = getMappedStatus(pesapal_payment_status_description);

    await Order.findByIdAndUpdate(order._id, {
      status: orderStatus,
      pesapalPaymentStatus: pesapalStatus,
      pesapalOrderTrackingId: pesapal_transaction_tracking_id,
    });

    console.log(`Order ${order._id} updated to ${orderStatus}`);
    return res.status(200).json({ success: true, message: 'IPN processed.' });
  } catch (error) {
    console.error('IPN error:', error);
    return res.status(500).json({ success: false, message: 'IPN handler failed.', error: error.message });
  }
};

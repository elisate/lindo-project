import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { submitPesapalOrder } from "../utils/pesapalService.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const { shippingAddress, paymentMethod, customerEmail, customerPhone, customerName } = req.body;

    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      shippingAddress,
      paymentMethod,
      customerEmail,
      customerPhone,
      customerName
    });

    if (paymentMethod === 'pesapal') {
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || 'Client';

      const pesapalRes = await submitPesapalOrder({
        amount: totalAmount,
        currency: 'RWF',
        email: customerEmail,
        phone: customerPhone,
        firstName,
        lastName,
        callbackUrl: 'https://your-domain.com/payment/success'
      });

      order.pesapalOrderTrackingId = pesapalRes.order_tracking_id;
      order.pesapalMerchantRequestId = pesapalRes.merchant_reference;
      order.pesapalRedirectUrl = pesapalRes.redirect_url;
    }

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully.",
      order,
      ...(paymentMethod === 'pesapal' && { redirectUrl: order.pesapalRedirectUrl })
    });

  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.productId', 'name price image');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve orders." });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'firstName lastName email')
      .populate('items.productId', 'name price image');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all orders." });
  }
};

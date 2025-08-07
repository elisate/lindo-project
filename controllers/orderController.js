import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { createPaymentToken, getPaymentRedirectUrl } from '../utils/dpoService.js';
import { DPO_CONFIG } from "../config/dpoConfig.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // Destructure additional address fields from req.body
    const {
      province,
      district,
      sector,
      cell,
      village,
      street,
      paymentMethod,
      customerEmail,
      customerPhone,
      customerName,
    } = req.body;

    // Construct shippingAddress subdocument
    const shippingAddress = {
      province,
      district,
      sector,
      cell,
      village,
      street,
    };

    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      shippingAddress,  // <-- set the new structured address here
      paymentMethod,
      customerEmail,
      customerPhone,
      customerName,
    });

    if (paymentMethod === 'dpo') {
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      const serviceDescription = 'E-Commerce Order Payment';
      const dpoPayload = {
        CompanyToken: DPO_CONFIG.companyToken,
        Request: "createToken",
        Transaction: {
          TransactionType: 'Purchase',
          PaymentAmount: Number(totalAmount).toFixed(2),
          PaymentCurrency: 'RWF',
          CompanyRef: `TX-${Date.now()}`,
          RedirectURL: 'https://your-frontend.com/payment/success',
          BackURL: 'https://your-frontend.com/payment/cancel',
          CustomerFirstName: firstName,
          CustomerLastName: lastName,
          CustomerEmail: customerEmail,
          CustomerPhone: customerPhone,
          ServiceDescription: serviceDescription,
          ServiceType: DPO_CONFIG.serviceType,
        },
      };
      const dpoResponse = await createPaymentToken(dpoPayload);
      const token = dpoResponse.TransToken;
      order.dpoTransactionToken = token;
      order.dpoRedirectUrl = getPaymentRedirectUrl(token);
    }

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully.',
      order,
      ...(paymentMethod === 'dpo' && { redirectUrl: order.dpoRedirectUrl }),
    });
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
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

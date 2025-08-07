import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false,
},


  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile', 'pesapal'],
    default: 'cash'
  },
  shippingAddress: String,
  // Pesapal fields
  pesapalOrderTrackingId: String,
  pesapalMerchantRequestId: String,
  pesapalPaymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'PENDING'
  },
  pesapalRedirectUrl: String,
  customerEmail: String,
  customerPhone: String,
  customerName: String,
  dpoTransactionToken: { type: String },
  dpoRedirectUrl: { type: String },
  dpoPaymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'PENDING',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;

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
    enum: ['cash', 'card', 'mobile', 'pesapal', 'dpo'], // Added 'dpo' since you use it
    default: 'cash'
  },
  shippingAddress: {
    province: { type: String, required: false },
    district: { type: String, required: false },
    sector: { type: String, required: false },
    cell: { type: String, required: false },
    village: { type: String, required: false },
    street: { type: String, required: false },
  },
  // DPO fields
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

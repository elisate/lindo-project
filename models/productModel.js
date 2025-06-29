import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
   image: {
      type:Array,
      required: true,
    },
  name: {
    type: String,
    required: true
  },

  description: String,

  price: {
    type: Number,
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  stockType: {
    type: String,
    enum: ['in_store', 'virtual_stock'],
    required: true
  },

  quantity: {
    type: Number,
    default: 0
  },

  shippingInfo: {
    provider: String,
    estimatedDeliveryDays: Number
  }

}, { timestamps: true });

const Product = model('Product', ProductSchema);
export default Product;

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  },
  quantity: { 
    type: Number, 
    default: 1,
    min: [1, 'Quantity can not be less than 1.']
  },
  price: { 
    type: Number, 
    required: true 
  }
}, { _id: false }); // no separate _id for subdocs if not needed

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  items: {
    type: [cartItemSchema],
    default: []
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

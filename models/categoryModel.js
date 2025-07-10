import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({

  image: {
    type: [String],
    required: false,

  },
  
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
}, { timestamps: true });

const Category = model('Category', CategorySchema);
export default Category;

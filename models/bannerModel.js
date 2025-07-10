import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BannerSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
 subTitle: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Banner = model('Banner', BannerSchema);
export default Banner;

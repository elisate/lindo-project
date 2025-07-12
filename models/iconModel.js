// models/iconModel.js
import mongoose from "mongoose";

const iconSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: false,
    },
    categoryId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Icon = mongoose.model("Icon", iconSchema);

export default Icon;

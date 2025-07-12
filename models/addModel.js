// models/adModel.js
import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: false,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;

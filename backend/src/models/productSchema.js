import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "seller",
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("product", productSchema);

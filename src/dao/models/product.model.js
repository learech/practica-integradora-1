import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  title: {
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
  thumbnail: {
    type: String,
    required: false,
  },
  code: {
    type: Number,
    required: true,
  },
  stock:{
    type: Number,
    required: true
  },

  category:{
    type: String,
    required: true
  },

  status:{
    type: Boolean,
    default: true
  }
});

export const productModel = mongoose.model("products", productSchema); 

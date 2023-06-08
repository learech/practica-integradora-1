import mongoose from "mongoose";
import { productModel } from "./product.model.js";

const cartSchema = new mongoose.Schema({
  name: String,
  year: Number,
  products: [
    {
      
      product: { type: mongoose.Schema.Types.ObjectId, ref: productModel },
      quantity: { type: Number },
     
    },
  ],
});

export const cartModel = mongoose.model("carts", cartSchema); 

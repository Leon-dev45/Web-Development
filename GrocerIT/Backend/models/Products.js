import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const productsSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  product_images: {
    type: Array,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_rating: {
    type: Array,
  },
  product_stock: {
    type: Number,
  },
});

export default model("Products", productsSchema);

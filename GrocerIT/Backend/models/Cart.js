import mongoose, { Types, model } from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema({
  owner_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

export default model("cart", CartSchema);

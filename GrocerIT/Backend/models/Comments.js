import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const commentsSchema = new Schema({
  product_owner: {
    type: String,
  },
  product: {
    type: String,
  },
  user_auth: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export default model("comments", commentsSchema);

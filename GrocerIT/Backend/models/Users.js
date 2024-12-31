import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UsersSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_auth: {
    type: String,
    required: true,
    unique: true,
  },
  user_phone_no: {
    type: Number,
    default: null,
  },
  user_shop_address: {
    type: String,
    default: null,
  },
  user_type: {
    type: String,
    default: "user",
  },
  user_products: {
    type: Array,
  },
  user_cart: {
    type: Array,
  },
  user_likes: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = model("Users", UsersSchema);

export default Users;

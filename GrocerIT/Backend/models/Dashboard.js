import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const dashboardSchema = new Schema({
  dashboard_owner: {
    type: String,
  },
  user_auth: {
    type: String,
  },
  product: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  delivery_address: {
    type: String,
  },
  delivered_to: {
    type: String,
  },
  bought_date: {
    type: String,
  },
  delivered: {
    type: Boolean,
  },
});

export default model("dashboard", dashboardSchema);

import { Router } from "express";
const router = Router();
import Dashboard, { findOneAndUpdate, find } from "../models/Dashboard";
import { findByIdAndUpdate } from "../models/Products";
import { findOneAndRemove } from "../models/Cart";
import { findOne } from "../models/Users";
import { default as mongoose } from "mongoose";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

router.put("/dashboard/:uid", async (req, res) => {
  await findOneAndUpdate(
    {
      dashboard_owner: req.params.uid,
      product: req.body.product,
    },
    { delivered: true }
  );
  return res.send("Success");
});

router.get("/dashboard/:uid", async (req, res) => {
  const dashboardDetails = await find({
    dashboard_owner: req.params.uid,
  });
  return res.send(dashboardDetails);
});

router.get("/orders/:uid", async (req, res) => {
  const dashboardDetails = await find({
    dashboard_owner: req.params.uid,
    delivered: false,
  });
  return res.send(dashboardDetails);
});

router.post("/dashboard", async (req, res) => {
  const dashboardDetails = req.body;
  let date = new Date();
  const owner = await findOne({
    user_products: mongoose.Types.ObjectId(dashboardDetails._id),
  });

  const saveDetails = Dashboard({
    dashboard_owner: owner.user_auth,
    product: dashboardDetails.product_name,
    quantity: dashboardDetails.cart_quantity,
    delivery_address: dashboardDetails.address,
    delivered_to: dashboardDetails.delivered_to,
    user_auth: dashboardDetails.user,
    bought_date:
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(),
    delivered: false,
  });
  await saveDetails.save();
  await findByIdAndUpdate(dashboardDetails._id, {
    $inc: { product_stock: -dashboardDetails.cart_quantity },
  });
  await findOneAndRemove({ product_id: dashboardDetails._id });
  return res.send("Sucess");
});

export default router;

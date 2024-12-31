const express = require("express");
const { body, validationResult } = require("express-validator");
const Users = require("../models/Users");
const router = express.Router();
import Users, {
  findOne,
  findOneAndUpdate,
  findByIdAndUpdate,
  find,
  findById,
} from "../models/Users";
import { findByIdAndDelete } from "../models/Products";

const formatString = (str) => {
  const new_str = str.replace(/_/gm, " ").replace("no", "number");
  return new_str.charAt(0).toUpperCase() + new_str.slice(1);
};

router.post(
  "/user",
  [
    body("username", "Username should have atleast 4 characters").isLength({
      min: 4,
    }),
    body("email", "Invalid Email").isEmail(),
    body("auth"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hello");
      return res.status(401).send({ data: null, error: errors.errors });
    } else {
      data = req.body;
      try {
        const user = Users({
          user_name: data.username,
          user_email: data.email,
          user_auth: data.auth,
        });
        await user.save();
      } catch (error) {
        return res.status(401).send({ data: null, error });
      }
      return res.send({ data: req.body, errors: null });
    }
  }
);

router.post(
  "/user/:id",
  [
    body("username", "Username should have atleast 4 characters"),
    body("user_phone", "Phone number should contain 10 characters").isLength({
      min: 10,
      max: 10,
    }),
    body("user_shop"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({ data: false });
    }
    const findUser = await Users.findOne({ user_auth: req.params.id });
    if (!findUser) {
      return res.status(200).send({ data: false });
    } else {
      try {
        if (req.body.username === "") {
          await Users.findOneAndUpdate(
            { user_auth: req.params.id },
            {
              $set: {
                user_phone_no: req.body.user_phone,
                user_shop_address: req.body.user_shop,
                user_type: "admin",
              },
            },
            { new: true }
          );
          return res.status(200).send({ data: true });
        }
        await Users.findOneAndUpdate(
          { user_auth: req.params.id },
          {
            $set: {
              user_phone_no: req.body.user_phone,
              user_shop_address: req.body.user_shop,
              user_name: req.body.username,
              user_type: "admin",
            },
          },
          { new: true }
        );
        return res.status(200).send({ data: true });
      } catch (error) {
        return res.status(200).send({ data: false });
      }
    }
  }
);

router.post("/superuser/:id", async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, { user_type: "super admin" });
    return res.send("Success");
  } catch {
    return res.send("User not found");
  }
});

router.get("/superuser/:id", async (req, res) => {
  const findUser = await Users.findOne({ user_auth: req.params.id });
  if (!findUser) {
    return res.send("User not found");
  } else {
    if (findUser.user_type === "super admin") {
      const users = await Users.find({ user_type: "admin" });
      return res.send(users);
    } else {
      return res.send("User is not super admin");
    }
  }
});

router.get("/user/:id", async (req, res) => {
  const findUser = await Users.findOne({ user_auth: req.params.id });
  if (!findUser) {
    return res.status(200).send({ data: null });
  } else {
    return res.status(200).send({ data: findUser });
  }
});

router.delete("/user/:id", async (req, res) => {
  const findUser = await findById(req.params.id);
  if (!findUser) {
    return res.status(200).send("User not found");
  } else {
    for (let i = 0; i < findUser.user_products.length; i++) {
      await findByIdAndDelete(findUser.user_products[i]);
    }
    await Users.findByIdAndUpdate(req.params.id, { user_type: "user" });
    return res.status(200).send("Admin deleted");
  }
});

export default router;

import { Router } from "express";
const router = Router();
import { body, validationResult } from "express-validator";
import { findOne, findOneAndUpdate } from "../models/Users";
import Products, {
  findById,
  find,
  findOneAndUpdate as _findOneAndUpdate,
  findOneAndDelete,
  findOne as _findOne,
} from "../models/Products";
import { default as mongoose, Mongoose } from "mongoose";
import Cart, { findOne as __findOne, find as _find } from "../models/Cart";

router.post(
  "/product/:uid",
  [
    body(
      "product_name",
      "Product name should contain atleast 3 characters"
    ).isLength({ min: 3 }),
    body(
      "product_description",
      "Product description should contain atleast 20 characters"
    ).isLength({ min: 20 }),
    body("product_quantity"),
    body(
      "product_images",
      "Product images should contain atleast one image"
    ).isArray({ min: 1 }),
    body("product_price"),
    body("product_category"),
    body("product_stock"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({ data: null, error: errors.errors });
    } else {
      try {
        const user = await findOne({ user_auth: req.params.uid });
        if (!user) {
          return res.status(200).send({ data: null, error: "User not found" });
        } else {
          const product_info = Products({
            product_owner: req.params.uid,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_quantity: req.body.product_quantity,
            product_images: req.body.product_images,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
            product_stock: req.body.product_stock,
          });
          const product = await product_info.save();
          await user.updateOne({ $push: { user_products: product._id } });
          return res.send({ data: "Success" });
        }
      } catch (error) {
        return res.status(200).send({ data: null, error: error });
      }
    }
  }
);

router.post("/checkproduct/:uid", async (req, res) => {
  const user = await findOne({ user_auth: req.params.uid });
  if (!user) {
    return res.send("User not found");
  } else {
    for (let i = 0; i < user.user_products.length; i++) {
      const product = await findById(user.user_products[i]);
      if (
        product.product_name === req.body.product_name &&
        product.product_quantity === Number(req.body.product_quantity)
      ) {
        return res.send("Product exists");
      }
    }
    return res.send("Product does not exists");
  }
});

router.get("/search/:uid/:searchTerm", async (req, res) => {
  try {
    const user = await findOne({ user_auth: req.params.uid });
    if (!user) {
      return res.send("User not found");
    }
    const searchItems = await find({
      product_name: {
        $regex:
          req.params.searchTerm.toUpperCase().charAt(0) +
          req.params.searchTerm.slice(1),
      },
    });
    // console.log(searchItems);
    return res.send(searchItems);
  } catch (error) {
    return res.send("Error");
  }
});

router.post("/add_cart/:uid/:pid", async (req, res) => {
  try {
    const user = await findOne({ user_auth: req.params.uid });
    if (!user) {
      return res.send("User not found");
    }
    const product = await __findOne({
      product_id: req.params.pid,
      owner_id: req.params.uid,
    });
    if (product !== null) {
      if (req.body.type === "dec") {
        await product.updateOne({ $inc: { quantity: -req.body.number } });
      } else {
        await product.updateOne({ $inc: { quantity: req.body.number } });
      }
    } else {
      const cartInfo = Cart({
        owner_id: req.params.uid,
        product_id: mongoose.Types.ObjectId(req.params.pid),
        quantity: req.body.number,
      });
      const info = await cartInfo.save();
      await user.updateOne({ $push: { user_cart: info._id } });
    }

    return res.send("Success");
  } catch (error) {
    return res.send("Error");
  }
});

router.get("/get_cart_item/:uid", async (req, res) => {
  try {
    let cart = [];
    const cartItems = await _find({ owner_id: req.params.uid });
    const user = await findOne({ user_auth: req.params.uid });

    for (let i = 0; i < cartItems.length; i++) {
      const item = await findById(cartItems[i].product_id);
      const owner = await findOne({
        user_products: mongoose.Types.ObjectId(item._id),
      });
      cart.push({
        ...item._doc,
        product_owner: owner.user_name,
        cart_quantity: cartItems[i].quantity,
      });
    }
    return res.send(cart);
  } catch (error) {
    return res.send("Error");
  }
});

router.delete("/delete_cart_item/:uid/:pid", async (req, res) => {
  // try {
  const product = await __findOne({
    product_id: req.params.pid,
    owner_id: req.params.uid,
  });
  if (product === null) {
    return res.send("Product not found");
  }
  await findOneAndUpdate(
    { user_auth: req.params.uid },
    { $pull: { user_cart: product._id } }
  );
  await product.deleteOne();
  return res.send("Success");
  // } catch (error) {
  //   return res.send("Error");
  // }
});

// router.put("/update_cart/:uid/:pid", async (req, res) => {
//   try {
//     const user = await Users.findById(req.params.uid);
//     if (!user) {
//       return res.send("User not found");
//     } else {
//       const product = user.user_cart.filter(
//         (item) => item.product === mongoose.Types.ObjectId(req.params.pid)
//       );
//       await user.updateOne({ $ });
//     }
//   } catch (error) {
//     return res.send("Error");
//   }
// });

router.post("/product/:uid/:pid", async (req, res) => {
  try {
    const user = await findOne({ user_auth: req.params.uid });
    if (!user) {
      return res.status(200).send("User not found");
    } else {
      const updatedProducts = await _findOneAndUpdate(
        { _id: req.params.pid },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedProducts) {
        return res.status(200).send("Product not found");
      } else {
        return res.send("Success");
      }
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/product/:uid/:pid", async (req, res) => {
  try {
    const user = await findOne({ user_auth: req.params.uid });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      const deleteProduct = await findOneAndDelete({
        _id: req.params.pid,
      });
      const updateUser = await user.updateOne({
        $pull: { user_products: mongoose.Types.ObjectId(req.params.pid) },
      });
      if (!deleteProduct || !updateUser) {
        return res.status(400).send("Cannot delete the product");
      } else {
        return res.send("Success");
      }
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/get-all-products", async (req, res) => {
  try {
    const products = await find();
    const allProd = [];
    for (let i = 0; i < products.length; i++) {
      const owner = await findOne({ user_products: products[i]._id });
      // console.log(owner.user_name);
      allProd.push({ ...products[i]._doc, product_owner: owner.user_name });
    }
    return res.send(allProd);
  } catch (error) {
    return res.send("Error");
  }
});

router.get("/show-product/:pid", async (req, res) => {
  try {
    const product = await findById(req.params.pid);
    return res.send(product);
  } catch (error) {
    return res.send({ error: "Success" });
  }
});

router.get("/product/:uid", async (req, res) => {
  let getAllProducts = [];
  let getProduct = {};
  try {
    const user = await findOne({ user_auth: req.params.uid });
    if (!user) {
      return res.status(400).send("User not found");
    } else {
      const products = user.user_products;
      for (let i = 0; i < products.length; i++) {
        const product = await _findOne({ _id: String(products[i]) });
        getProduct = { ...product, product_owner: user.user_name };
        getAllProducts.push(getProduct);
      }
      getProduct = {};
      return res.send(getAllProducts);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;

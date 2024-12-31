import { Router } from "express";
const router = Router();
import { body, validationResult } from "express-validator";
import { findOne, find } from "../models/Users";
import { findOne as _findOne } from "../models/Products";
import Comments, {
  find as _find,
  findOne as __findOne,
  findOneAndUpdate,
} from "../models/Comments";
import { default as mongoose } from "mongoose";

router.get("/comment_by_user/:uid", async (req, res) => {
  const allComments = [];
  const comments = await _find({ product_owner: req.params.uid });
  for (let i = 0; i < comments.length; i++) {
    const commentedBy = await findOne({
      user_auth: comments[i].user_auth,
    });
    allComments.push({
      ...comments[i]._doc,
      commentedBy: commentedBy.user_name,
    });
  }
  return res.send(allComments);
});

// router.get("/comment_for_dashboard/:uid/:pid", async (req, res) => {
//   const comments = await Comments.find({product_owner: req.params.uid})
// })

router.get("/comment_by_product/:uid/:pid", async (req, res) => {
  const comments = await _find({
    product: mongoose.Types.ObjectId(req.params.pid),
  });
  return res.send(comments);
});

router.post(
  "/comment/:uid/:pid",
  [
    body("rating", "Rating should only contain numbers").isNumeric(),
    body("comment", "Comment should atleast contain 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send(errors.errors);
    } else {
      const user = await findOne({ user_auth: req.params.uid });
      if (!user) {
        return res.status(400).send("User not found");
      } else {
        try {
          const product = await _findOne({ _id: req.params.pid });
          if (!product) {
            return res.status(400).send("Product not found!");
          } else {
            const owner = await find({
              user_products: mongoose.Types.ObjectId(req.params.pid),
            });
            if (String(owner[0].user_auth) === String(req.params.uid)) {
              return res.send("You cannot comment on your own product");
            }
            const exists = await __findOne({
              user_auth: req.params.uid,
              product: req.params.pid,
            });
            if (exists) {
              await findOneAndUpdate(
                {
                  user_auth: req.params.uid,
                  product: mongoose.Types.ObjectId(req.params.pid),
                },
                { rating: req.body.rating, comment: req.body.comment }
              );
              return res.send("Success");
            }
            const comment = Comments({
              user_auth: req.params.uid,
              product_owner: owner[0].user_auth,
              rating: req.body.rating,
              comment: req.body.comment,
              product: req.params.pid,
            });
            const saved = await comment.save();
            await product.updateOne({ $push: { product_rating: comment._id } });
            return res.send("Success");
          }
        } catch (error) {
          return res.status(400).send("Product not found");
        }
      }
    }
  }
);

export default router;

const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema({
  productId: Number,
  images: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  name: String,
  price: Number,
  category: String,
  gender: String,
  size: String,
  quantity: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

//check if the product already there
bagSchema.pre("save", async function (next) {
  const existingBag = await this.constructor.findOne({
    userId: this.userId,
    productId: this.productId,
  });
  if (existingBag) {
    throw new Error("already there");
  }
  next();
});

const Bag = mongoose.model("bag", bagSchema);

module.exports = Bag;

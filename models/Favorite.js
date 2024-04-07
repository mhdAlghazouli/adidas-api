const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  productId: Number,
  image: {
    type: String,
    required: true,
  },
  name: String,
  price: Number,
  category: String,
  gender: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

//check if the product already there
favoriteSchema.pre("save", async function (next) {
  const existingFavorite = await this.constructor.findOne({
    userId: this.userId,
    productId: this.productId,
  });
  if (existingFavorite) {
    throw new Error("already there");
  }
  next();
});

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;

const Favorite = require("../models/Favorite");

module.exports.favorite_post = async (req, res) => {
  const { productId, image, name, price, category, gender, userId } = req.body;
  try {
    const favorite = await Favorite.create({
      productId,
      image,
      name,
      price,
      category,
      gender,
      userId,
    });
    res.status(201).json({ favorite });
  } catch (error) {
    console.log(error);
  }
};

module.exports.favorite_get = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId }).populate({
      path: "userId",
      select: "-password",
    });
    res.json(favorites);
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.favorite_delete = async (req, res) => {
  const { productId } = req.params;

  try {
    const deleteFavorite = await Favorite.findOneAndDelete({
      productId: productId,
    });
    if (deleteFavorite) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ error: "item not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFavoriteById = async (req, res) => {
  const { userId, favoriteId } = req.params;
  try {
    const favorite = await Favorite.find({
      userId,
    }).populate({
      path: "userId",
      select: "-password",
    });
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.status(200).json({ favorite, exists: true });
  } catch (error) {
    console.error("Error fetching favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

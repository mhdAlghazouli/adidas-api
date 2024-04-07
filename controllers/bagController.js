const Bag = require("../models/Bag");

module.exports.bag_post = async (req, res) => {
  const {
    productId,
    images,
    image,
    name,
    price,
    category,
    gender,
    size,
    quantity,
    userId,
  } = req.body;
  try {
    const bag = await Bag.create({
      productId,
      images,
      image,
      name,
      price,
      category,
      gender,
      size,
      quantity,
      userId,
    });
    res.status(201).json({ bag });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.bag_get = async (req, res) => {
  const { userId } = req.params;

  try {
    const bags = await Bag.find({ userId }).populate({
      path: "userId",
      select: "-password",
    });
    res.json(bags);
  } catch (error) {
    console.error("Error retrieving bags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.bag_delete = async (req, res) => {
  const { productId } = req.params;

  try {
    const deleteBag = await Bag.findOneAndDelete({
      productId: productId,
    });
    if (deleteBag) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ error: "item not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.bag_update = async (req, res) => {
  const { bagId } = req.params;
  const { image, size, quantity } = req.body;

  try {
    const updatedBag = await Bag.findByIdAndUpdate(
      bagId,
      { image, size, quantity },
      { new: true }
    );

    if (!updatedBag) {
      return res.status(404).json({ message: "Bag not found" });
    }

    res.status(200).json({
      bag: {
        bagId: updatedBag._id,
        image: updatedBag.email,
        size: updatedBag.fName,
        quantity: updatedBag.lName,
      },

      message: "ok",
    });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

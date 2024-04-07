const { Router } = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = Router();

router.post("/favoritePost", favoriteController.favorite_post);
router.get("/favoriteGet/:userId", favoriteController.favorite_get);
router.delete("/favoriteDelete/:productId", favoriteController.favorite_delete);
router.get("/favorite/:userId", favoriteController.getFavoriteById);

module.exports = router;

const { Router } = require("express");
const bagController = require("../controllers/bagController");

const router = Router();

router.post("/bagPost", bagController.bag_post);
router.get("/bagGet/:userId", bagController.bag_get);
router.delete("/bagDelete/:productId", bagController.bag_delete);
router.put("/bagEdit/:bagId", bagController.bag_update);

module.exports = router;

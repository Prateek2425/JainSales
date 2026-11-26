const express = require("express");
const router = express.Router();

const authMiddleware = require("../controllers/authMiddleware");

const {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
} = require("../controllers/cartController");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.put("/update/:productId", authMiddleware, updateCartQuantity);
module.exports = router;
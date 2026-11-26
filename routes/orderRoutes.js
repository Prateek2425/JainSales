const express = require("express");
const router = express.Router();

const authMiddleware = require("../controllers/authMiddleware");
const { getMyOrders, checkout, getVendorOrders, updateVendorOrderStatus } = require("../controllers/orderController");

router.post("/place", authMiddleware, checkout);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/vendor_orders", authMiddleware, getVendorOrders);
router.patch("/vendor-orders/:id/status", authMiddleware, updateVendorOrderStatus);
// router.post("/createReview", authMiddleware, createReview);
// router.get("/getReview:productId", getProductReviews);

module.exports = router;
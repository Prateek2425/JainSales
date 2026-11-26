const express = require("express");
const router = express.Router();
const {
    addProduct,
    getProducts,
    getVendorProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByCategory
} = require("../controllers/productController");

const verifyToken = require("../controllers/authMiddleware");
const upload = require("../config/multer");
router.post("/", verifyToken, upload.single("image"), addProduct);
router.get("/vendor", verifyToken, getVendorProducts);
router.get("/", getProducts);
router.get("/:id", verifyToken, getProductById);
router.get("/category/:categoryName", getProductByCategory);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
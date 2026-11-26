const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add product to wishlist
const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        const existingWishlist = await Wishlist.findOne({
            user: userId,
            product: productId
        });
        if (existingWishlist) {
            return res.status(400).json({
                success: false,
                message: "Product already exists in wishlist"
            });
        }
        const wishlist = await Wishlist.create({
            user: userId,
            product: productId
        });
        return res.status(201).json({
            success: true,
            message: "Product added to wishlist successfully",
            wishlist
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.find({ user: userId })
            .populate({
                path: "product",
                select: "name price quantity description category vendor image createdAt updatedAt"
            });
        const data = wishlist
            .filter(item => item.product)
            .map(item => item.product);
        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOneAndDelete({
            user: userId,
            product: productId
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Product not found in wishlist"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};
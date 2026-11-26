const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
            });
        }

        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.user.id,
        }).populate({
            path: "items.productId",
            select: "name price quantity image description category vendorId",
        });

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOneAndUpdate(
            {
                userId,
                "items.productId": productId
            },
            {
                $pull: {
                    items: {
                        productId: productId
                    }
                }
            },
            {
                returnDocument: "after"
            }
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.quantity} items are available`
            });
        }

        const cart = await Cart.findOneAndUpdate(
            {
                userId,
                "items.productId": productId
            },
            {
                $set: {
                    "items.$.quantity": quantity
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
};
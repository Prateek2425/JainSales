const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const Category = require("../models/Category");
const Wishlist = require("../models/Wishlist");
const mongoose = require("mongoose");
const fs = require("fs");

const addProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            quantity,
            description,
            category,
        } = req.body;
        // Validate category
        if (!category || !mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Valid category ID is required",
            });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const product = await Product.create({
            name,
            price,
            quantity,
            description,
            category,
            vendor: req.user.id,
            image: result.secure_url
        });
        fs.unlinkSync(req.file.path);
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        // If category is provided, filter by category
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category ID",
                });
            }

            filter.category = category;
        }

        const products = await Product.find(filter)
            .populate("category", "name description")
            .populate("vendor", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: products.length,
            data: products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findOneAndUpdate(

            {
                _id: req.params.id,
                vendorId: req.user.id
            },

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!product) {
            return res.status(403).json({
                message: "You are not authorized to update this product."
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorId = req.user.id;
        const product = await Product?.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        if (!product?.vendor) {
            return res.status(400).json({
                success: false,
                message: "Vendor ID is missing from this product"
            });
        }
        if (product?.vendor?.toString() !== vendorId?.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product"
            });
        }
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.id;
        const product = await Product.findById(productId)
            .populate("category")
            .populate("vendor", "name email");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        const wishlist = await Wishlist.findOne({
            user: userId,
            product: productId
        });

        return res.status(200).json({
            success: true,
            data: {
                ...product.toObject(),
                isWishlisted: !!wishlist
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getVendorProducts = async (req, res) => {
    try {
        const vendorId = req.user.id;
        const products = await Product.find({
            vendor: vendorId
        }).populate("category").populate("vendor", "name email");
        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getProductByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        // Find category using name
        const category = await Category.findOne({
            name: { $regex: `^${categoryName}$`, $options: "i" }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Find products using category ID
        const products = await Product.find({
            category: category._id
        })
            .populate("category")
            .populate("vendor", "name email");

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    addProduct,
    getProducts,
    getVendorProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByCategory
};
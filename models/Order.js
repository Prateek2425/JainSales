const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        vendorOrders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "VendorOrder",
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        paymentMethod: {
            type: String,
            default: "COD",
        },
    },
    { timestamps: true }
);

const vendorOrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },

                name: String,
                price: Number,
                quantity: Number,
                image: String,
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },

        trackingNumber: {
            type: String,
            default: null,
        },

        courierName: {
            type: String,
            default: null,
        },

        shippedAt: Date,
        deliveredAt: Date,
    },
    { timestamps: true }
);


const Order = mongoose.model("Order", orderSchema);
const VendorOrder = mongoose.model("VendorOrder", vendorOrderSchema);


module.exports = { Order, VendorOrder };
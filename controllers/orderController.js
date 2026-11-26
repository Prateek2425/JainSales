// const mongoose = require("mongoose");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const Order = require("../models/Order");
// const generateOrderId = require("../services/Uitls/generateOrderId");

// const placeOrder = async (req, res) => {
//     const session = await mongoose.startSession();

//     try {
//         const userId = req.user.id;
//         const { productIds } = req.body;

//         if (
//             !Array.isArray(productIds) ||
//             productIds.length === 0 ||
//             productIds.some(id => !mongoose.isValidObjectId(id))
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please select valid cart products"
//             });
//         }

//         if (new Set(productIds).size !== productIds.length) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Duplicate product IDs are not allowed"
//             });
//         }

//         let createdOrder;

//         await session.withTransaction(async () => {

//             // Only selected cart items
//             const cartItems = await Cart.find({
//                 user: userId,
//                 product: { $in: productIds }
//             }).session(session);

//             if (cartItems.length !== productIds.length) {
//                 throw new Error(
//                     "Some selected products are not available in your cart"
//                 );
//             }

//             let totalAmount = 0;
//             const orderItems = [];

//             for (const item of cartItems) {

//                 const product = await Product.findOneAndUpdate(
//                     {
//                         _id: item.product,
//                         quantity: { $gte: item.quantity }
//                     },
//                     {
//                         $inc: {
//                             quantity: -item.quantity
//                         }
//                     },
//                     {
//                         returnDocument: "after",
//                         session
//                     }
//                 );

//                 if (!product) {
//                     throw new Error(
//                         `${item.product} is out of stock or insufficient quantity available`
//                     );
//                 }

//                 totalAmount += product.price * item.quantity;

//                 orderItems.push({
//                     product: product._id,
//                     name: product.name,
//                     price: product.price,
//                     quantity: item.quantity
//                 });
//             }

//             const orders = await Order.Order.create(
//                 [{
//                     orderId: generateOrderId(),
//                     user: userId,
//                     products: orderItems,
//                     totalAmount,
//                     status: "pending"
//                 }],
//                 { session }
//             );

//             createdOrder = orders[0];

//             // Remove only selected products from cart
//             await Cart.deleteMany(
//                 {
//                     user: userId,
//                     product: { $in: productIds }
//                 },
//                 { session }
//             );
//         });

//         return res.status(201).json({
//             success: true,
//             message: "Order placed successfully",
//             data: createdOrder
//         });

//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     } finally {
//         await session.endSession();
//     }
// };



// const getOrderById = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { orderId } = req.params;

//         const order = await Order.Order.findOne({
//             _id: orderId,
//             user: userId
//         }).populate("products.product", "name price image");

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: order
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// const createReview = async (req, res) => {
//     try {
//         const { productId, orderId, rating, description } = req.body;
//         const userId = req.user.id;

//         // Validate IDs
//         if (
//             !mongoose.Types.ObjectId.isValid(productId) ||
//             !mongoose.Types.ObjectId.isValid(orderId)
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid product or order ID",
//             });
//         }

//         // Validate mandatory rating
//         if (
//             rating === undefined ||
//             !Number.isInteger(Number(rating)) ||
//             Number(rating) < 1 ||
//             Number(rating) > 5
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Rating is required and must be between 1 and 5",
//             });
//         }

//         // Validate optional description
//         if (description !== undefined && typeof description !== "string") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Description must be a string",
//             });
//         }

//         if (description && description.length > 1000) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Description cannot exceed 1000 characters",
//             });
//         }

//         // Verify delivered order belongs to logged-in user
//         const order = await Order.Order.findOne({
//             _id: orderId,
//             userId,
//             status: "Delivered",
//         });

//         if (!order) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Only delivered orders can be reviewed",
//             });
//         }

//         // Verify product belongs to this order
//         const purchasedProduct = order.products.some(
//             (item) => item.productId.toString() === productId
//         );

//         if (!purchasedProduct) {
//             return res.status(400).json({
//                 success: false,
//                 message: "This product does not belong to your order",
//             });
//         }

//         // Create review
//         const review = await Order.Review.create({
//             userId,
//             productId,
//             orderId,
//             rating: Number(rating),
//             description: description?.trim() || "",
//         });

//         const populatedReview = await Order.Review.findById(review._id)
//             .populate("userId", "name")
//             .lean();

//         return res.status(201).json({
//             success: true,
//             message: "Review added successfully",
//             data: populatedReview,
//         });

//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(409).json({
//                 success: false,
//                 message: "You have already reviewed this product for this order",
//             });
//         }

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// const getProductReviews = async (req, res) => {
//     try {
//         const { productId } = req.params;

//         const page = Math.max(1, parseInt(req.query.page) || 1);
//         const limit = Math.min(
//             50,
//             Math.max(1, parseInt(req.query.limit) || 10)
//         );

//         const sort = req.query.sort || "latest";
//         const rating = req.query.rating
//             ? Number(req.query.rating)
//             : null;

//         // Validate product ID
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid product ID",
//             });
//         }
//         // Sorting options
//         const sortOptions = {
//             latest: { createdAt: -1 },
//             highest: { rating: -1, createdAt: -1 },
//             lowest: { rating: 1, createdAt: -1 },
//             top: { helpfulCount: -1, rating: -1, createdAt: -1 },
//         };
//         if (!sortOptions[sort]) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid sorting option",
//             });
//         }
//         if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Rating filter must be between 1 and 5",
//             });
//         }
//         const productObjectId = new mongoose.Types.ObjectId(productId);
//         // Base filter for product statistics
//         const baseFilter = {
//             productId: productObjectId,
//         };
//         // Filter for individual reviews
//         const reviewFilter = { ...baseFilter };
//         if (rating !== null) {
//             reviewFilter.rating = rating;
//         }
//         // Run queries in parallel
//         const [reviews, totalReviews, ratingStats] = await Promise.all([
//             Order.Review.find(reviewFilter)
//                 .populate("userId", "name")
//                 .sort(sortOptions[sort])
//                 .skip((page - 1) * limit)
//                 .limit(limit)
//                 .lean(),
//             Order.Review.countDocuments(reviewFilter),
//             Order.Review.aggregate([
//                 { $match: baseFilter },
//                 {
//                     $group: {
//                         _id: null,
//                         totalReviews: { $sum: 1 },
//                         averageRating: { $avg: "$rating" },
//                         ratings: { $push: "$rating" },
//                     },
//                 },
//             ]),
//         ]);
//         // Rating distribution
//         const stats = ratingStats[0];
//         const distribution = {
//             1: 0,
//             2: 0,
//             3: 0,
//             4: 0,
//             5: 0,
//         };

//         if (stats) {
//             stats.ratings.forEach((value) => {
//                 distribution[value]++;
//             });
//         }

//         const averageRating = stats
//             ? Number(stats.averageRating.toFixed(1))
//             : 0;

//         return res.status(200).json({
//             success: true,
//             message: "Product reviews fetched successfully",
//             data: {
//                 productId,
//                 averageRating,
//                 totalReviews: stats?.totalReviews || 0,
//                 distribution,
//                 pagination: {
//                     currentPage: page,
//                     limit,
//                     totalFilteredReviews: totalReviews,
//                     totalPages: Math.ceil(totalReviews / limit),
//                     hasNextPage: page * limit < totalReviews,
//                     hasPrevPage: page > 1,
//                 },
//                 reviews,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


// module.exports = { placeOrder, getMyOrders, getOrderById, createReview, getProductReviews };




// const Order = require("../models/Order");

// const createOrder = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Cart items ko pehle database se
//         // populate karke validate karna hai.

//         const groupedProducts = {};

//         cartItems.forEach((item) => {
//             const vendorId = item.product.vendorId.toString();

//             if (!groupedProducts[vendorId]) {
//                 groupedProducts[vendorId] = [];
//             }

//             groupedProducts[vendorId].push({
//                 productId: item.product._id,
//                 name: item.product.name,
//                 price: item.product.price,
//                 quantity: item.quantity,
//                 image: item.product.image,
//             });
//         });

//         const totalAmount = Object.values(groupedProducts)
//             .flat()
//             .reduce(
//                 (sum, item) => sum + item.price * item.quantity,
//                 0
//             );

//         // 1. Create Parent Order
//         const order = await Order.Order.create({
//             userId,
//             totalAmount,
//             paymentStatus: "Pending",
//         });

//         const vendorOrderIds = [];

//         // 2. Create Individual Vendor Orders
//         for (const vendorId of Object.keys(groupedProducts)) {
//             const products = groupedProducts[vendorId];

//             const vendorTotal = products.reduce(
//                 (sum, item) =>
//                     sum + item.price * item.quantity,
//                 0
//             );

//             const vendorOrder = await Order.VendorOrder.create({
//                 orderId: order._id,
//                 vendorId,
//                 customerId: userId,
//                 products,
//                 totalAmount: vendorTotal,
//             });

//             vendorOrderIds.push(vendorOrder._id);
//         }

//         // 3. Link Vendor Orders with Parent Order
//         order.vendorOrders = vendorOrderIds;
//         await order.save();

//         res.status(201).json({
//             success: true,
//             message: "Order placed successfully",
//             order,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// module.exports = { createOrder };



const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");


const checkout = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { productIds } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please select products for checkout",
            });
        }

        // Validate duplicate IDs
        const selectedSet = new Set(productIds.map(String));

        if (selectedSet.size !== productIds.length) {
            return res.status(400).json({
                success: false,
                message: "Duplicate product IDs are not allowed",
            });
        }

        let createdOrder;

        await session.withTransaction(async () => {

            // STEP 1: Fetch user's cart
            const cart = await Cart.findOne({
                userId: req.user.id,
            })
                .populate("items.productId")
                .session(session);

            if (!cart || cart.items.length === 0) {
                throw new Error("Cart is empty");
            }

            // STEP 2: Get only selected cart items
            const selectedItems = cart.items.filter((item) => {
                return (
                    item.productId &&
                    selectedSet.has(item.productId._id.toString())
                );
            });

            if (selectedItems.length !== selectedSet.size) {
                throw new Error(
                    "Some selected products are not available in your cart"
                );
            }



            const groupedProducts = {};

            for (const item of selectedItems) {
                const product = item.productId;

                if (!product) {
                    throw new Error("Product not found");
                }

                // Your Product schema uses "vendor", not "vendorId"
                if (!product.vendor) {
                    throw new Error(
                        `Vendor not found for ${product.name}`
                    );
                }

                if (
                    !Number.isInteger(item.quantity) ||
                    item.quantity <= 0
                ) {
                    throw new Error("Invalid product quantity");
                }

                if (product.quantity < item.quantity) {
                    throw new Error(
                        `${product.name} is out of stock`
                    );
                }

                const vendorId = product.vendor.toString();

                if (!groupedProducts[vendorId]) {
                    groupedProducts[vendorId] = [];
                }

                groupedProducts[vendorId].push({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                    image: product.image,
                });
            }

            console.log("GROUPED PRODUCTS:", groupedProducts);



            // STEP 4: Calculate total amount
            const allProducts = Object.values(groupedProducts).flat();

            const totalAmount = allProducts.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );

            // STEP 5: Create parent order
            const [order] = await Order.Order.create(
                [{
                    userId: req.user.id,
                    totalAmount,
                    paymentStatus: "Pending",
                    paymentMethod: "COD",
                    vendorOrders: [],
                }],
                { session }
            );

            // STEP 6: Prepare vendor-wise orders
            const vendorOrderData = [];

            for (const vendorId of Object.keys(groupedProducts)) {
                const products = groupedProducts[vendorId];

                const vendorTotal = products.reduce(
                    (sum, item) =>
                        sum + item.price * item.quantity,
                    0
                );

                vendorOrderData.push({
                    orderId: order._id,
                    vendorId,
                    customerId: req.user.id,
                    products,
                    totalAmount: vendorTotal,
                    status: "Pending",
                });
            }

            // STEP 7: Create vendor orders
            const vendorOrders = await Order.VendorOrder.insertMany(
                vendorOrderData,
                { session }
            );

            // STEP 8: Save vendor order IDs in parent order
            order.vendorOrders = vendorOrders.map(
                (vendorOrder) => vendorOrder._id
            );

            await order.save({ session });

            // STEP 9: Reduce stock for selected products only
            for (const item of selectedItems) {
                const result = await Product.updateOne(
                    {
                        _id: item.productId._id,
                        quantity: { $gte: item.quantity },
                    },
                    {
                        $inc: {
                            quantity: -item.quantity,
                        },
                    },
                    { session }
                );

                if (result.modifiedCount !== 1) {
                    throw new Error(
                        `Stock update failed for ${item.productId.name}`
                    );
                }
            }

            // STEP 10: Remove selected products only
            cart.items = cart.items.filter((item) => {
                return !selectedSet.has(
                    item.productId._id.toString()
                );
            });

            await cart.save({ session });

            createdOrder = order;
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: createdOrder,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });

    } finally {
        await session.endSession();
    }
};



const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.Order.find({
            userId: req.user.id,
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "vendorOrders",
                model: Order.VendorOrder,
                populate: [
                    {
                        path: "vendorId",
                        select: "name email",
                    },
                ],
            });

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No orders found",
                totalOrders: 0,
                orders: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            orders,
        });

    } catch (error) {
        console.log("GET MY ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getVendorOrders = async (req, res) => {
    try {
        const vendorId = req.user.id;

        const vendorOrders = await Order.VendorOrder.find({
            vendorId: vendorId,
        })
            .sort({ createdAt: -1 })
            .populate("customerId", "name email")
            .populate("orderId", "paymentStatus paymentMethod")
            .populate("products.productId", "name image category");

        res.status(200).json({
            success: true,
            message: "Vendor orders fetched successfully",
            totalOrders: vendorOrders.length,
            orders: vendorOrders,
        });

    } catch (error) {
        console.log("GET VENDOR ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const updateVendorOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const vendorId = req.user.id;

        const allowedStatuses = [
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const vendorOrder = await Order.VendorOrder.findOne({
            _id: req.params.id,
            vendorId: vendorId,
        });

        if (!vendorOrder) {
            return res.status(404).json({
                success: false,
                message: "Vendor order not found",
            });
        }

        // Status transition validation
        const allowedTransitions = {
            Pending: ["Confirmed", "Cancelled"],
            Confirmed: ["Shipped", "Cancelled"],
            Shipped: ["Delivered"],
            Delivered: [],
            Cancelled: [],
        };

        if (
            !allowedTransitions[vendorOrder.status]?.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${vendorOrder.status} to ${status}`,
            });
        }

        vendorOrder.status = status;

        if (status === "Shipped") {
            vendorOrder.shippedAt = new Date();

            vendorOrder.trackingNumber =
                req.body.trackingNumber || null;

            vendorOrder.courierName =
                req.body.courierName || null;
        }

        if (status === "Delivered") {
            vendorOrder.deliveredAt = new Date();
        }

        await vendorOrder.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: vendorOrder,
        });

    } catch (error) {
        console.log("UPDATE VENDOR ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




module.exports = { checkout, getMyOrders, getVendorOrders, updateVendorOrderStatus };

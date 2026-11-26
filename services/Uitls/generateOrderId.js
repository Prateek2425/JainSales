
const crypto = require("crypto");

const generateOrderId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomString = crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase()
        .slice(0, 6);

    return `ORD-${date}-${randomString}`;
};

module.exports = generateOrderId;

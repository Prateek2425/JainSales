const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../services/emailService");

// Signup
const signup = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const email = req?.body?.email?.trim()?.toLowerCase();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            token,
            message: "Signup Successful",
            user: userResponse
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Login
const login = async (req, res) => {
    try {

        const { password } = req.body;
        const email = req?.body?.email?.trim()?.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const userResponse = user.toObject();
        delete userResponse.password;
        res.json({
            message: "Login Successful",
            token,
            user: userResponse
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP
        user.otp = otp;

        // Valid for 5 minutes
        user.otpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        // Send Email
        await sendOtpEmail(user.email, otp);

        res.json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const verifyOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({
                message: "OTP Expired"
            });

        }

        res.json({
            message: "OTP Verified"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const resetPassword = async (req, res) => {

    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (user.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP"
        });
    }

    if (user.otpExpire < Date.now()) {
        return res.status(400).json({
            message: "OTP Expired"
        });
    }

    user.password = await bcrypt.hash(password, 10);

    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({
        message: "Password Reset Successfully"
    });

};

module.exports = {
    signup,
    login,
    forgotPassword,
    verifyOtp,
    resetPassword
};
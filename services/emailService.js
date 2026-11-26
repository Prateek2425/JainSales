const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,

        pass: process.env.EMAIL_PASSWORD

    }

});

const sendOtpEmail = async (email, otp) => {

    await transporter.sendMail({

        from: process.env.EMAIL,

        to: email,

        subject: "Password Reset OTP",

        html: `
            <h2>Password Reset</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>This OTP is valid for 5 minutes.</p>
        `

    });

};

module.exports = {
    sendOtpEmail
};
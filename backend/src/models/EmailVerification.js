const mongoose = require('mongoose');

const emailVerificationSchema = new mongoose.Schema(
    {
        verificationToken: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);

const mongoose = require('mongoose');

const invalidTokenSchema = new mongoose.Schema(
    {
        invalidToken: {
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

module.exports = mongoose.model('InvalidToken', invalidTokenSchema);

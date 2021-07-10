const mongoose = require('mongoose');

const passwordRecoverySchema = new mongoose.Schema(
    {
        recoveryToken: {
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

module.exports = mongoose.model('PasswordRecovery', passwordRecoverySchema);

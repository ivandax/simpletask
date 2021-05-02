const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            min: 6,
            max: 30,
        },
        name: {
            type: String,
            required: true,
            min: 6,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

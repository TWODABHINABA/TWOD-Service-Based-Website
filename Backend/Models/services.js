const { text } = require('body-parser');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image: {
        url: String,
        filename: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    offerDetails: [
        {
            price: {
                type: Number,
                required: true,
            },
            description: {
                heading: {
                    type: String,
                    required: true,
                },
                features: {
                    type: [String],
                    required: true,
                }
            }
        }
    ],
    feedback: [{
        name: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        message: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    }],
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
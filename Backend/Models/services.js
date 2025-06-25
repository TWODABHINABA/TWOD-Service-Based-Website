const { text } = require('body-parser');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    icon: {
        type: String,
        
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
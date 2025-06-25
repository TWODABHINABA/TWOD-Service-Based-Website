const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    linkedinId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Developer', developerSchema);
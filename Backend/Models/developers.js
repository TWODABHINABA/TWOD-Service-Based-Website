const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
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
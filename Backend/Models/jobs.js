const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    perks: {
        type: [String],
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'paused'],
        default: 'open'
    },
    location: {
        type: String,
        required: false
    },
    salaryRange: {
        min: { type: Number, required: false },
        max: { type: Number, required: false }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', JobSchema);
const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true,
    },
    email: {
        type: String,
        required: true,
    },  
    message: {
        type: String,       
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // note the change here to "person"
        required: true,
      },
    status: {
        type: String,
        default: "pending", // pending, approved, rejected
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
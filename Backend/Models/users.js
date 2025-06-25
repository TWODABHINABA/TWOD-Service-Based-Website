const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        default: "user",
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.role === "admin") {
        const existingAdmin = await mongoose
            .model("user")
            .findOne({ role: "admin" });
        if (
            existingAdmin &&
            existingAdmin._id.toString() !== user._id.toString()
        ) {
            return next(new Error("An admin already exists!"));
        }
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("user", userSchema);
module.exports = User;
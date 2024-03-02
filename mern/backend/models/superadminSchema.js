const mongoose = require("mongoose")

const superadminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "SuperAdmin"
    },
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("superadmin", superadminSchema)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    hasCovid: {
        type: Boolean,
        required: true,
        default: false,
    },
    numberOfVaccines: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("User", userSchema);

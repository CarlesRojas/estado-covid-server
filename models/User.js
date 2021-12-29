const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    hasCovid: {
        type: Boolean,
        required: true,
        default: false,
    },
    covidStartDate: {
        type: Date,
        default: Date.now,
    },
    numberOfVaccines: {
        type: Number,
        required: true,
        default: 0,
    },
    provinceId: {
        type: String,
        min: 1,
        max: 1024,
    },
    autonomicCommunityId: {
        type: String,
        min: 1,
        max: 1024,
    },
    ageRange: {
        type: String,
        min: 1,
        max: 1024,
    },
});

module.exports = mongoose.model("User", userSchema);

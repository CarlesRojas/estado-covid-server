const mongoose = require("mongoose");

const historicAutonomicCommunitySchema = new mongoose.Schema({
    autonomicCommunityId: {
        type: String,
        required: true,
        min: 1,
        max: 1024,
    },
    historic: [
        {
            totalUsers: {
                type: Number,
                required: true,
                default: 0,
            },
            usersWithCovid: {
                type: Number,
                required: true,
                default: 0,
            },
            usersWithOneVaccine: {
                type: Number,
                required: true,
                default: 0,
            },
            usersWithTwoVaccines: {
                type: Number,
                required: true,
                default: 0,
            },
            usersWithThreeVaccines: {
                type: Number,
                required: true,
                default: 0,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = mongoose.model("HistoricAutonomicCommunity", historicAutonomicCommunitySchema);

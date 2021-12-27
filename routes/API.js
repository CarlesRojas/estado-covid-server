// Get express Router
const router = require("express").Router();

// Dot env constants
const dotenv = require("dotenv");
dotenv.config();

// Google API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Get the User & Historic schemas
const User = require("../models/User");
const HistoricProvince = require("../models/HistoricProvince");
const HistoricAutonomicCommunitie = require("../models/HistoricAutonomicCommunity");

// Get the Validation schemas
const {
    createUserValidation,
    userIDValidation,
    updateVaccinesValidation,
    updateLocationValidation,
    autonomicCommuntyValidation,
    provinceValidation,
} = require("../validation");

router.get("/getGoogleAPIKey", async (_, response) => {
    return response.json({ googleAPIKey: GOOGLE_API_KEY });
});

router.post("/createUser", async (request, response) => {
    // Validate data
    const { error } = createUserValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { numberOfVaccines, provinceId, autonomicCommunityId } = request.body;

        // Create User
        const user = new User({
            hasCovid: false,
            numberOfVaccines,
            provinceId,
            autonomicCommunityId,
        });

        // Save user to DB
        await user.save();

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/getUserInfo", async (request, response) => {
    // Validate data
    const { error } = userIDValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { id } = request.body;

        // Get the user
        const user = await User.findOne({ _id: id });

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/userCaughtCovid", async (request, response) => {
    // Validate data
    const { error } = userIDValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { id } = request.body;

        // Update the user
        await User.findOneAndUpdate({ _id: id }, { $set: { hasCovid: true, covidStartDate: new Date() } });

        // Get the user
        const user = await User.findOne({ _id: id });

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/userNoLongerHasCovid", async (request, response) => {
    // Validate data
    const { error } = userIDValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { id } = request.body;

        // Update the user
        await User.findOneAndUpdate({ _id: id }, { $set: { hasCovid: false } });

        // Get the user
        const user = await User.findOne({ _id: id });

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/updateVaccines", async (request, response) => {
    // Validate data
    const { error } = updateVaccinesValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { id, numberOfVaccines } = request.body;

        // Update the user
        await User.findOneAndUpdate({ _id: id }, { $set: { numberOfVaccines } });

        // Get the user
        const user = await User.findOne({ _id: id });

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/updateLocation", async (request, response) => {
    // Validate data
    const { error } = updateLocationValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { id, provinceId, autonomicCommunityId } = request.body;

        // Update the user
        await User.findOneAndUpdate({ _id: id }, { $set: { provinceId, autonomicCommunityId } });

        // Get the user
        const user = await User.findOne({ _id: id });

        // Return the user in the response
        response.json(user);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/getprovinceCovidInfo", async (request, response) => {
    // Validate data
    const { error } = provinceValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { provinceId } = request.body;

        const totalUsers = await User.find({ provinceId });
        const usersWithCovid = await User.find({ provinceId, hasCovid: true });
        const usersWithOneVaccine = await User.find({ provinceId, numberOfVaccines: 1 });
        const usersWithTwoVaccines = await User.find({ provinceId, numberOfVaccines: 2 });
        const usersWithThreeVaccines = await User.find({ provinceId, numberOfVaccines: 3 });

        // Return the user in the response
        response.json({
            totalUsers: totalUsers.length,
            usersWithCovid: usersWithCovid.length,
            usersWithOneVaccine: usersWithOneVaccine.length,
            usersWithTwoVaccines: usersWithTwoVaccines.length,
            usersWithThreeVaccines: usersWithThreeVaccines.length,
        });
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/getAutonomicCommunityCovidInfo", async (request, response) => {
    // Validate data
    const { error } = autonomicCommuntyValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { autonomicCommunityId } = request.body;

        const totalUsers = await User.find({ autonomicCommunityId });
        const usersWithCovid = await User.find({ autonomicCommunityId, hasCovid: true });
        const usersWithOneVaccine = await User.find({ autonomicCommunityId, numberOfVaccines: 1 });
        const usersWithTwoVaccines = await User.find({ autonomicCommunityId, numberOfVaccines: 2 });
        const usersWithThreeVaccines = await User.find({ autonomicCommunityId, numberOfVaccines: 3 });

        // Return the user in the response
        response.json({
            totalUsers: totalUsers.length,
            usersWithCovid: usersWithCovid.length,
            usersWithOneVaccine: usersWithOneVaccine.length,
            usersWithTwoVaccines: usersWithTwoVaccines.length,
            usersWithThreeVaccines: usersWithThreeVaccines.length,
        });
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/getHistoricProvinceCovidInfo", async (request, response) => {
    // Validate data
    const { error } = provinceValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { provinceId } = request.body;

        const historicData = await HistoricProvince.findOne({ provinceId });
        const last30 = historicData.historic.slice(-30);

        response.json(last30);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

router.post("/getHistoricAutonomicCommunityCovidInfo", async (request, response) => {
    // Validate data
    const { error } = autonomicCommuntyValidation(request.body);
    if (error) return response.status(400).json({ error: error.details[0].message });

    try {
        const { autonomicCommunityId } = request.body;

        const historicData = await HistoricAutonomicCommunitie.findOne({ autonomicCommunityId });
        const last30 = historicData.historic.slice(-30);

        response.json(last30);
    } catch (error) {
        return response.status(400).json({ error });
    }
});

module.exports = router;

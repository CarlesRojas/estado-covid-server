// Get express Router
const router = require("express").Router();

// Dot env constants
const dotenv = require("dotenv");
dotenv.config();

// Google API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Get the google API key
router.get("/getGoogleAPIKey", async (_, response) => {
    return response.json({ googleAPIKey: GOOGLE_API_KEY });
});

module.exports = router;

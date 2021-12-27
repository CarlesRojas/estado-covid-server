// Get express Router
const router = require("express").Router();

// Dot env constants
const dotenv = require("dotenv");
dotenv.config();

// Google API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Get the User scheme
const User = require("../models/User");

// Get the Validation schemas
const { createUserValidation } = require("../validation");

router.get("/getGo
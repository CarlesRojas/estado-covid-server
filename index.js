// #################################################
//   IMPORTS
// #################################################

// Libraries
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const restApiRoutes = require("./routes/restApi");

// #################################################
//   ENVIROMENT
// #################################################

// Dot env constants
dotenv.config();

// #################################################
//   SERVER
// #################################################

// Express Server
const app = express();

// HTTP access
const server = http.createServer(app);

// #################################################
//   ROUTES
// #################################################

// No Cors Middleware
app.use(cors());

// Middleware to parse the body of requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes middlewares
app.use("/api_v1/", restApiRoutes);

// #################################################
//   START SERVER
// #################################################

// Get port
const port = process.env.PORT || 3100;

// Start the server
server.listen(port, () => console.log(`Server up and running on port ${port}.`));

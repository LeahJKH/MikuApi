const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the cors package

const app = express();

// Use CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Headers for info for the user
app.use((req, res, next) => {
  const originalEnd = res.end;

  res.end = function (...args) {
    // will send status code before it sends out the headers
    res.setHeader("X-API-Status-Code", res.statusCode);
    originalEnd.apply(this, args);
  };

  res.setHeader("X-Licensed-By", "Crypton Future Media");
  res.setHeader("X-API-Version", "2.0");
  res.setHeader("X-API-Status", "Operational");
  res.setHeader("X-Leah-Status", "Meow :3");
  next();
});

// Read JSON files
const vocaloids = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json/vocaloids.json"), "utf-8")
);
const mikuTimeLine = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json/mikuTimeLine.json"), "utf-8")
);
const mikuFacts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json/mikuFacts.json"), "utf-8")
);

// Create GET requests
app.get("/", (req, res) => {
  res.send(
    "up and running! Welcome to the Miku API. Read docs on how to use: https://github.com/LeahJKH/MikuApiGithub"
  );
});

// Get json files
app.get("/vocaloids", (req, res) => {
  res.json(vocaloids);
});

app.get("/mikuTimeLine", (req, res) => {
  res.json(mikuTimeLine);
});

app.get("/mikuFacts", (req, res) => {
  res.json(mikuFacts);
});
// Get json files

// Initialize server
app.listen(8001, () => {
  console.log("Running on port 8001.");
});

module.exports = app;

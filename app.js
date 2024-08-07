const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: "50mb" }));

// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.json());

const artworksController = require("./controllers/artworksController.js");
app.use("/artworks", artworksController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to PixPage!");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;

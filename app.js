const express = require("express");
const cors = require("cors");

const app = express();

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

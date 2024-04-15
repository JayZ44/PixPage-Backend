const express = require("express");
const artworks = express.Router();
const {
  getAllArtworks,
  getArtwork,
  createArtworkGrid,
} = require("../queries/artworks");

// get all
artworks.get("/all", async (req, res) => {
  const allArtworks = await getAllArtworks();
  if (allArtworks[0]) {
    res.status(200).json(allArtworks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// get one
artworks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const artwork = await getArtwork(id);
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

// create grid
artworks.post("/", async (req, res) => {
  const artworkGrid = await createArtworkGrid(req.body);
  res.json(artworkGrid);
});

module.exports = artworks;

const express = require("express");
const artworks = express.Router();
const {
  getAllArtworks,
  getArtwork,
  createArtworkGrid,
  createArtworkSquares,
  deleteArtwork,
  updateArtworkGrid,
  updateArtworkSquares,
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

// create square
artworks.post("/squares", async (req, res) => {
  const artworkSquare = await createArtworkSquares(req.body);
  res.json(artworkSquare);
});

// delete grid
artworks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletingArtwork = await deleteArtwork(id);
  if (deletingArtwork.id) {
    res.status(200).json(deletingArtwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

// update grid
artworks.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatingArtwork = await updateArtworkGrid(id, req.body);
  if (updatingArtwork.id) {
    res.status(200).json(updatingArtwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

// update squares
artworks.put("/squares/:id", async (req, res) => {
  const { id } = req.params;
  const updatingArtwork = await updateArtworkSquares(id, req.body);
  if (updatingArtwork.id) {
    res.status(200).json(updatingArtwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});
module.exports = artworks;

const express = require("express");
const artworks = express.Router();
const {
  getAllArtworks,
  getAllCreators,
  getArtworkSquares,
  getOneArtwork,
  getCreator,
  deleteArtwork,
  deleteCreator,
  createArtworkGrid,
  createCreator,
  createArtworkSquares,
  updateArtworkGrid,
  updateArtworkSquares,
  updateCreator,
} = require("../queries/artworks");

// get all artworks
artworks.get("/all", async (req, res) => {
  const allArtworks = await getAllArtworks();
  if (allArtworks[0]) {
    res.status(200).json(allArtworks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// get all creators
artworks.get("/creators", async (req, res) => {
  const allCreators = await getAllCreators();
  if (allCreators[0]) {
    res.status(200).json(allCreators);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// get one artwork
artworks.get("/squares/:id", async (req, res) => {
  const { id } = req.params;
  const artwork = await getArtworkSquares(id);
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

artworks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const artwork = await getOneArtwork(id);
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

// get one creator
artworks.get("/creators/:id", async (req, res) => {
  const { id } = req.params;
  const creator = await getCreator(id);
  if (creator) {
    res.json(creator);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

// create grid
artworks.post("/", async (req, res) => {
  const artworkGrid = await createArtworkGrid(req.body);
  res.json(artworkGrid);
});

// create creator
artworks.post("/creators", async (req, res) => {
  const creator = await createCreator(req.body);
  res.json(creator);
});

// create square
artworks.post("/squares", async (req, res) => {
  try {
    const result = await createArtworkSquares(req.body);
    res.json(result); // Ensure a JSON response is sent
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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

// delete creator
artworks.delete("/creators/:id", async (req, res) => {
  const { id } = req.params;
  const deletingCreator = await deleteCreator(id);
  if (!deletingCreator.id) {
    res.status(200).json(deletingCreator);
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
  console.log("ALSO ARTWORK", updatingArtwork);
  if (updatingArtwork.id) {
    res.status(200).json(updatingArtwork);
  } else {
    res.status(404).json({ error: "not found. oof" });
  }
});

artworks.put("/creators/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Updating creator with ID:", id);
  console.log("New creator data:", req.body);

  const updatingCreator = await updateCreator(id, req.body);

  if (updatingCreator.id) {
    res.status(200).json(updatingCreator);
  } else {
    console.log("Error in updateCreator:", updatingCreator); // Add this line for debugging
    res.status(404).json({ error: "not found. oof" });
  }
});

module.exports = artworks;

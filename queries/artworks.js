const db = require("../db/dbconfig");

// all artwork grids
const getAllArtworks = async () => {
  try {
    const allArtworks = await db.any("SELECT * FROM grids");
    console.log(allArtworks);
    return allArtworks;
  } catch (error) {
    return error;
  }
};

// one artwork (squares)
const getArtwork = async (id) => {
  console.log(id);
  try {
    const oneArtwork = await db.any(
      "SELECT * FROM squares WHERE grid_id=$1",
      id
    );
    return oneArtwork;
  } catch (error) {
    return error;
  }
};

const deleteArtwork = async (id) => {
  console.log(id);
  try {
    const deletedArtwork = await db.any(
      "DELETE FROM squares WHERE grid_id=$1 RETURNING *",
      id
    );
    return deletedArtwork;
  } catch (error) {
    return error;
  }
};

// create artwork grid
const createArtworkGrid = async (artwork) => {
  const { title, creator, created_at, grid_size } = artwork;
  try {
    const newArtwork = await db.one(
      "INSERT INTO grids (title, creator, created_at, grid_size) VALUES($1,$2,$3,$4) RETURNING *",
      [title, creator, created_at, grid_size]
    );
    return newArtwork;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllArtworks,
  getArtwork,
  deleteArtwork,
  createArtworkGrid,
};

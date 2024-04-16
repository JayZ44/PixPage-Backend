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

// delete one artwork (grids ofc)
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

// create artwork squares
const createArtworkSquares = async (artwork) => {
  const { coordinates, color, grid_id } = artwork;
  try {
    const newArtwork = await db.one(
      "INSERT INTO squares (coordinates,color,grid_id) VALUES($1,$2,$3) RETURNING *",
      [coordinates, color, grid_id]
    );
    return newArtwork;
  } catch (error) {
    return error;
  }
};

// update artwork grid
const updateArtworkGrid = async (id, artwork) => {
  //{"title": "Demo4",
  // "creator": "Demoman",
  // "created_at": "NOW()",
  // "grid_size": 9}
  const { title, creator, created_at, grid_size } = artwork;
  try {
    const updatedArtworkGrid = await db.one(
      "UPDATE grids SET title=$1,creator=$2,created_at=$3,grid_size=$4 WHERE id=$5 RETURNING *",
      [title, creator, created_at, grid_size, id]
    );
    return updatedArtworkGrid;
  } catch (error) {
    return error;
  }
};

// update artwork squares
const updateArtworkSquares = async (id, artwork) => {
  //{"coordinates": "a3",
  // "color": "yellow",
  // "grid_id": "4"}
  const { coordinates, color, grid_id } = artwork;
  //   console.log(coordinates, color, grid_id, id);
  try {
    const updatedArtworkSquares = await db.one(
      "UPDATE squares SET coordinates=$1,color=$2,grid_id=$3 WHERE id=$4 RETURNING *",
      [coordinates, color, grid_id, id]
    );

    return updatedArtworkSquares;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllArtworks,
  getArtwork,
  deleteArtwork,
  createArtworkGrid,
  createArtworkSquares,
  updateArtworkGrid,
  updateArtworkSquares,
};

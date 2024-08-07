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

// all creators

const getAllCreators = async () => {
  try {
    const allCreators = await db.any("SELECT * FROM creators");
    console.log(allCreators);
    return allCreators;
  } catch (error) {
    return error;
  }
};

// one artwork (squares)
const getArtworkSquares = async (id) => {
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

const getOneArtwork = async (id) => {
  try {
    const artwork = await db.any("SELECT * FROM grids WHERE id=$1", id);
    console.log(artwork);
    return artwork;
  } catch (error) {
    return error;
  }
};

const getCreator = async (id) => {
  console.log(id);
  try {
    const oneCreator = await db.any("SELECT * FROM creators WHERE id=$1", id);
    return oneCreator;
  } catch (error) {
    return error;
  }
};

// delete one artwork (grids ofc)
const deleteArtwork = async (id) => {
  console.log(id);
  try {
    const deletedArtwork = await db.any(
      "DELETE FROM grids WHERE id=$1 RETURNING *",
      id
    );
    return deletedArtwork;
  } catch (error) {
    return error;
  }
};

const deleteCreator = async (id) => {
  console.log(id);
  try {
    const deletedCreator = await db.any(
      "DELETE FROM creators WHERE id=$1 RETURNING *",
      id
    );
    return deletedCreator;
  } catch (error) {
    return error;
  }
};

// create artwork grid
const createArtworkGrid = async (artwork) => {
  const { title, creator, created_at, grid_size, creator_id } = artwork;
  try {
    const newArtwork = await db.one(
      "INSERT INTO grids (title, creator, created_at, grid_size, creator_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [title, creator, created_at, grid_size, creator_id]
    );
    return newArtwork;
  } catch (error) {
    return error;
  }
};

const createCreator = async (creator) => {
  const { name, bio } = creator;
  try {
    const newCreator = await db.one(
      "INSERT INTO creators (name, bio) VALUES($1,$2) RETURNING *",
      [name, bio]
    );
    return newCreator;
  } catch (error) {
    return error;
  }
};

// create artwork squares
const createArtworkSquares = async (artworkArrayOfArrays) => {
  try {
    for (const artworkArray of artworkArrayOfArrays) {
      for (const artwork of artworkArray) {
        console.log("Artwork object:", artwork); // Log each object in the inner arrays

        const { coordinates, color, grid_id } = artwork;

        if (
          coordinates === undefined ||
          color === undefined ||
          grid_id === undefined
        ) {
          console.error("Error: One or more values are undefined!");
          continue; // Skip this item if values are undefined
        }

        await db.one(
          "INSERT INTO squares (coordinates, color, grid_id) VALUES($1, $2, $3) RETURNING *",
          [coordinates, color, grid_id]
        );
      }
    }
  } catch (error) {
    console.error("Database error:", error);
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
  const { coordinates, color, grid_id } = artwork;

  console.log("Updating square with ID:", id);
  console.log("New data:", { coordinates, color, grid_id });
  console.log("ARTWORK", artwork);
  try {
    const updatedArtworkSquares = await db.oneOrNone(
      "UPDATE squares SET coordinates=$1, color=$2, grid_id=$3 WHERE id=$4 RETURNING *",
      [coordinates, color, grid_id, id]
    );

    if (!updatedArtworkSquares) {
      console.log("No square found with ID:", id);
      return { error: "No square found with the provided ID." };
    }

    return updatedArtworkSquares;
  } catch (error) {
    console.error("Error updating square:", error);
    return { error: "Database error occurred." };
  }
};

const updateCreator = async (id, creator) => {
  const { name, bio } = creator;
  console.log(creator, id);
  try {
    const updatedCreator = await db.one(
      "UPDATE creators SET name=$1, bio=$2 WHERE id=$3 RETURNING *",
      [name, bio, id]
    );

    console.log("UPDATED", updatedCreator);

    return updatedCreator;
  } catch (error) {
    return error;
  }
};
module.exports = {
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
};

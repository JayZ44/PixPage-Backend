import React, { useState } from "react";
import "./Grid.css"; // Import CSS file for grid styles

const Grid = () => {
  const [gridData, setGridData] = useState(createEmptyGrid());

  // Function to create an empty 8x8 grid
  function createEmptyGrid() {
    const rows = 8;
    const cols = 8;
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ x: j, y: i, color: "white" });
      }
      grid.push(row);
    }
    return grid;
  }

  // Function to handle click on a grid square
  function handleSquareClick(x, y) {
    const updatedGridData = gridData.map((row) =>
      row.map((square) =>
        square.x === x && square.y === y
          ? { ...square, color: "blue" } // Change color on click (example)
          : square
      )
    );
    setGridData(updatedGridData);
  }

  // Function to save the grid data to the backend
  function saveImage() {
    // Send gridData to backend server (POST request)
    // Example:
    fetch("/api/saveImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gridData),
    })
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        console.error("Error saving image:", error);
      });
  }

  return (
    <div>
      <h1>Pixel Art Maker</h1>
      <div className="grid-container">
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((square) => (
              <div
                key={`${square.x}-${square.y}`}
                className="grid-square"
                style={{ backgroundColor: square.color }}
                onClick={() => handleSquareClick(square.x, square.y)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
};

export default Grid;

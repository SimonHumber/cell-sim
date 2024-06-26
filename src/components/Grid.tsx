import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Vertex from "./Vertex";
import "./styles.css";

const Grid = () => {
  const [rowWidth, setRowWidth] = useState(20);
  const [colHeight, setColHeight] = useState(20);
  const [cells, setCells] = useState<Vertex[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(500);
  const [gridKey, setGridKey] = useState(0); // State to force re-rendering

  const createGrid = () => {
    var initialCells: Vertex[][] = [];
    for (let i = 0; i < colHeight; i++) {
      initialCells[i] = [];
      for (let j = 0; j < rowWidth; j++) {
        initialCells[i][j] = new Vertex(j, i);
      }
    }
    // cell in middle should be grown
    initialCells[Math.floor(colHeight / 2)][Math.floor(rowWidth / 2)].isGrown =
      true;
    return initialCells;
  };

  useEffect(() => {
    if (colHeight && rowWidth) {
      setCells(createGrid());
    }
    //re-render when first mount, and when row and col are changed
  }, [rowWidth, colHeight]);

  const renderGrid = () => {
    return cells.map((row, i) => {
      return (
        <div key={i} style={{ display: "flex" }}>
          {row.map((vertex, j) => {
            // iterate through 2d array of vertices
            // if within bounds, define neighbours
            // each neighbouring components will have reference to
            // each other's vertices

            const leftNeighbour = j > 0 ? cells[i][j - 1] : undefined;
            const rightNeighbour =
              j < row.length - 1 ? cells[i][j + 1] : undefined;
            const upNeighbour = i > 0 ? cells[i - 1][j] : undefined;
            const downNeighbour =
              i < cells.length - 1 ? cells[i + 1][j] : undefined;

            return (
              <Cell
                key={`${i}-${j}`}
                vertex={vertex}
                leftNeighbour={leftNeighbour}
                rightNeighbour={rightNeighbour}
                upNeighbour={upNeighbour}
                downNeighbour={downNeighbour}
                isRunning={isRunning}
                timer={timer}
                rerender={() => setGridKey((prev) => prev + 1)}
              />
            );
          })}
        </div>
      );
    });
  };

  const onStartClick = () => {
    setIsRunning(true);
  };
  const onStopClick = () => {
    setIsRunning(false);
  };
  const onResetClick = () => {
    onStopClick();
    setCells(createGrid());
  };

  return (
    <div className="grid-container">
      <h2>Cell Simulator</h2>
      {isRunning ? (
        <button onClick={onStopClick}>Stop</button>
      ) : (
        <button onClick={onStartClick}>Grow</button>
      )}
      <button onClick={onResetClick}>Reset</button>
      {isRunning ? (
        <div>Sim running</div>
      ) : (
        <div>
          <br />
        </div>
      )}
      <br />
      <label>Delay in ms</label>
      <input
        style={{ marginRight: "5px", marginLeft: "5px" }}
        type="number"
        onChange={(event) => setTimer(parseInt(event.target.value))}
        value={timer}
      />
      <label>Column height</label>
      <input
        style={{ marginLeft: "5px" }}
        type="number"
        onChange={(event) => setColHeight(parseInt(event.target.value))}
        value={colHeight}
      />
      <label>Row width</label>
      <input
        style={{ marginLeft: "5px" }}
        type="number"
        onChange={(event) => setRowWidth(parseInt(event.target.value))}
        value={rowWidth}
      />
      <div className="grid">
        {rowWidth && colHeight && rowWidth > 1 && colHeight > 1 ? (
          renderGrid()
        ) : (
          <p>Please create a column and height greater than 1</p>
        )}
      </div>
    </div>
  );
};

export default Grid;

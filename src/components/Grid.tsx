import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const Grid = () => {
  const [rowWidth, setRowWidth] = useState(20);
  const [colHeight, setColHeight] = useState(20);
  const [cells, setCells] = useState<boolean[][]>([]);
  const [startSim, setStartSim] = useState(false);
  const [timer, setTimer] = useState(500);

  const initCells = () => {
    var initialCells: boolean[][] = [];
    for (let i = 0; i < colHeight; i++) {
      initialCells[i] = Array(rowWidth).fill(false);
    }
    // Example: Set one cell to true in the middle of the grid
    initialCells[Math.floor(rowWidth / 2)][Math.floor(colHeight / 2)] = true;
    return initialCells;
  };
  useEffect(() => {
    setCells(initCells());
  }, []);

  const renderGrid = () => {
    return cells.map((row, i) => (
      <div key={i} style={{ display: "flex" }}>
        {row.map((isFilled, j) => (
          <Cell isFilled={isFilled} onClick={() => toggleCell(i, j)} />
        ))}
      </div>
    ));
  };
  const toggleCell = (col: number, row: number) => {
    var newCells = [...cells];
    newCells[col][row] = !newCells[col][row];
    setCells([...newCells]);
  };

  const onStartClick = () => {
    growCells();
  };
  const onResetClick = () => {
    setCells(initCells());
  };
  const growCells = async (
    col = Math.floor(rowWidth / 2),
    row = Math.floor(colHeight / 2),
  ) => {
    var newCells = [...cells];

    if (row > 0 && !newCells[col][row - 1]) {
      newCells[col][row - 1] = true; // left
      setCells([...newCells]);
      await new Promise<void>((resolve) => setTimeout(resolve, timer));
      growCells(col, row - 1); // recursive call to keep growing left
    }

    if (row < colHeight - 1 && !newCells[col][row + 1]) {
      newCells[col][row + 1] = true; // right
      setCells([...newCells]);
      await new Promise<void>((resolve) => setTimeout(resolve, timer));
      growCells(col, row + 1); // recursive call to keep growing right
    }

    if (col > 0 && !newCells[col - 1][row]) {
      newCells[col - 1][row] = true; // up
      setCells([...newCells]);
      await new Promise<void>((resolve) => setTimeout(resolve, timer));
      growCells(col - 1, row); // recursive call to keep growing up
    }

    if (col < rowWidth - 1 && !newCells[col + 1][row]) {
      newCells[col + 1][row] = true; // down
      setCells([...newCells]);
      await new Promise<void>((resolve) => setTimeout(resolve, timer));
      growCells(col + 1, row); // recursive call to keep growing down
    }
  };

  return (
    <div>
      <h2>Grid</h2>
      <div>{renderGrid()}</div>
      <button onClick={onStartClick}>Grow</button>
      <button onClick={onResetClick}>Reset</button>
      <input
        type="number"
        onChange={(event) => setTimer(parseInt(event.target.value))}
        value={timer}
      />
    </div>
  );
};

export default Grid;

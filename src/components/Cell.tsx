import React, { useEffect, useState } from "react";
import Vertex from "./Vertex";
import "./styles.css";

interface CellProps {
  leftNeighbour?: Vertex;
  rightNeighbour?: Vertex;
  upNeighbour?: Vertex;
  downNeighbour?: Vertex;
  vertex: Vertex;
  isRunning: boolean;
  timer: number;
  rerender: () => void;
}

const Cell = ({
  vertex,
  isRunning,
  leftNeighbour,
  rightNeighbour,
  upNeighbour,
  downNeighbour,
  timer,
  rerender,
}: CellProps) => {
  const [showCell, setShowCell] = useState(vertex.isGrown);

  useEffect(() => {
    let run: NodeJS.Timeout | null = null;

    const growCell = () => {
      if (leftNeighbour && !leftNeighbour.isGrown) {
        leftNeighbour.isGrown = true;
        rerender();
      } else if (rightNeighbour && !rightNeighbour.isGrown) {
        rightNeighbour.isGrown = true;
        rerender();
      } else if (upNeighbour && !upNeighbour.isGrown) {
        upNeighbour.isGrown = true;
        rerender();
      } else if (downNeighbour && !downNeighbour.isGrown) {
        downNeighbour.isGrown = true;
        rerender();
      } else {
        clearInterval(run!); // Clear interval when animation completes
      }
    };

    if (isRunning && showCell) {
      run = setInterval(growCell, timer);
    }

    return () => {
      clearInterval(run!); // Clear interval on component unmount or isRunning change
      // ! means that run will never be null
    };
  }, [
    isRunning,
    showCell,
    leftNeighbour?.isGrown,
    rightNeighbour?.isGrown,
    upNeighbour?.isGrown,
    downNeighbour?.isGrown,
  ]);

  // when a neighbour modifies our vertex object, we trigger re-render and grow
  useEffect(() => {
    setShowCell(vertex.isGrown);
  }, [vertex.isGrown]);

  const handleClick = () => {
    vertex.isGrown = !vertex.isGrown;
    rerender();
  };

  return (
    <div
      onClick={handleClick}
      className={`cell ${showCell ? "grown" : "empty"}`}
    ></div>
  );
};

export default Cell;

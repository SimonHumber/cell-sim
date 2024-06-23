import React from "react";

interface CellProps {
  isFilled: boolean;
  onClick: () => void;
}
const Cell = ({ isFilled, onClick }: CellProps) => {
  return (
    <div onClick={onClick}>
      {isFilled ? (
        <div style={{ fontSize: 30, marginLeft: "3px" }}>o</div>
      ) : (
        <div style={{ fontSize: 30, marginLeft: "3px" }}>_</div>
      )}
    </div>
  );
};

export default Cell;

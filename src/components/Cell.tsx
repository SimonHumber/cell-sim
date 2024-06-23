import React from "react";

interface CellProps {
  isFilled: boolean;
}
const Cell = ({ isFilled }: CellProps) => {
  return (
    <div>
      {isFilled ? (
        <div style={{ fontSize: 30, marginLeft: "3px" }}>o</div>
      ) : (
        <div style={{ fontSize: 30, marginLeft: "3px" }}>_</div>
      )}
    </div>
  );
};

export default Cell;

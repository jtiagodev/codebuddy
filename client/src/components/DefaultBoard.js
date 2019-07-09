import React from "react";

const DefaultBoard = ({ board }) => {
  return <option value={board.value}>{board.label}</option>;
};

export default DefaultBoard;

import React from "react";
import { getMetadata } from "./lib/metadata";
import _ from "lodash";

const SelectBoard = () => {
  console.log("SELECT RENDER");

  const metadata = getMetadata();
  console.log(metadata);

  if (metadata) {
    return <span>LOADING METADATA</span>;
  } else {
    _.forEach(metadata.defaultBoards, (v, k) => {
      return (
        <span>
          {v} on {k}
        </span>
      );
    });
  }
};

export default SelectBoard;

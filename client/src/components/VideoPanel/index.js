/* eslint-disable */
import React from "react";
import { Flex } from "../Grid";
import _ from "lodash";

const VideoPanel = ({
  identifiedBoard,
  identifiedCommands,
  identifiedCommmandsAsStrings,
  commandsInterfaceGroup1
}) => {
  // sample nested array
  var pets = new Array();
  pets[0] = new Array("Sheba", 13, "cat");
  pets[1] = new Array("Jasper", 12, "dog");

  return (
    <Flex flexDirection="column">
      {/* <Flex flexDirection="column"> */}
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Codes Identified:{" "}
        <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
          {identifiedCommands}
        </span>
      </span>
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Commands Identified:{" "}
        <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
          {identifiedCommmandsAsStrings}
        </span>
      </span>

      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Interface for Group 1:{" "}
        <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
          {commandsInterfaceGroup1}
        </span>
      </span>
      {/* </Flex> */}

      {/* <Flex flexDirection="column"> */}
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Board Identified:
      </span>
      {_.map(identifiedBoard, (boardRow, i) => {
        return (
          <span style={{ fontSize: "10px" }} key={i}>
            {JSON.stringify(boardRow)}
          </span>
        );
      })}
      {/* </Flex> */}
    </Flex>
  );
};

export default VideoPanel;

import React, { useState } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";

const ControlRecognition = () => {
  return (
    <>
      <ButtonGroup minimal={true}>
        <Button
          id="Solution"
          icon="code"
          onClick={event => solutionRecognition()}
        >
          Recognize Solution
        </Button>
        <Button id="Map" icon="map" onClick={event => mapRecognition()}>
          Recognize Map
        </Button>
      </ButtonGroup>
      <span>Currently Identifying: something</span>
    </>
  );
};
export default ControlRecognition;

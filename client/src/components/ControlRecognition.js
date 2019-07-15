import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";
import { speak } from "../lib/speechSyntesis";

import { executeRobot } from "../lib/execution";
import { useStateValue } from "../components/StateManagement";

const ControlRecognition = () => {
  const [state, dispatch] = useStateValue();

  return (
    <ButtonGroup>
      <Button
        id="Commands"
        onClick={() => {
          dispatch({
            type: "SET_SYSTEM_CAMERA",
            camera: "Recognizing commands"
          });

          speak("Recognizing Commands...");
          solutionRecognition();
        }}
      >
        <span style={{ fontFamily: "Delius Swash Caps" }}>
          Recognize Commands
        </span>
      </Button>

      <Button
        id="Map"
        onClick={event => {
          dispatch({
            type: "SET_SYSTEM_CAMERA",
            camera: "Recognizing board"
          });
          speak("Recognizing Board...");
          mapRecognition();
        }}
      >
        <span style={{ fontFamily: "Delius Swash Caps" }}>Recognize Board</span>
      </Button>

      <Button
        variant="success"
        id="Robot"
        onClick={event => {
          dispatch({
            type: "SET_STATUS",
            camera: "Executing Commands"
          });
          executeRobot();
        }}
      >
        <span style={{ fontFamily: "Delius Swash Caps" }}>
          Execute Commands
        </span>
      </Button>
    </ButtonGroup>
  );
};
export default ControlRecognition;

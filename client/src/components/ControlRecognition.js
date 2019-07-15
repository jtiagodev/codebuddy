import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";
import { speak } from "../lib/speechSyntesis";
import appActions from "../lib/appActions";

import { executeRobot } from "../lib/execution";
import { useStateValue } from "../components/StateManagement";

const ControlRecognition = () => {
  const [{ config, video }, dispatch] = useStateValue();
  const { gameMode } = config;
  const { identifiedCommands } = video;
  return (
    <ButtonGroup>
      <Button
        id="Commands"
        onClick={() => {
          appActions.setSystemCameraStatus("Recognizing Commands");
          speak("Recognizing Commands...");
          solutionRecognition(appActions(dispatch));
        }}
      >
        <span style={{ fontFamily: "Delius Swash Caps" }}>
          Recognize Commands
        </span>
      </Button>

      <Button
        id="Map"
        onClick={event => {
          appActions.setSystemCameraStatus("Recognizing Board");
          speak("Recognizing Board...");
          mapRecognition(appActions(dispatch));
        }}
      >
        <span style={{ fontFamily: "Delius Swash Caps" }}>Recognize Board</span>
      </Button>

      <Button
        variant="success"
        id="Robot"
        onClick={event => {
          executeRobot(appActions(dispatch), identifiedCommands, gameMode);
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

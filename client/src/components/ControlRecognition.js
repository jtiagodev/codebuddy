import React, { useState } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";
import { speak } from "../lib/speechSyntesis";

const CurrentlyIdentifying = ({ type }) => {
  return <span>Currently Identifying {type}</span>;
};

const ControlRecognition = () => {
  const [identifying, setIdentifying] = useState("Solution");

  return (
    <>
      <ButtonGroup minimal={true}>
        <Button
          id="Solution"
          icon="code"
          onClick={event => {
            setIdentifying("Solution");
            speak("Identifying Solution...");
            solutionRecognition();
          }}
        >
          Recognize Solution
        </Button>
        <Button
          id="Map"
          icon="map"
          onClick={event => {
            setIdentifying("Map");
            speak("Identifying Map...");
            mapRecognition();
          }}
        >
          Recognize Map
        </Button>
      </ButtonGroup>
      <CurrentlyIdentifying type={identifying} />
    </>
  );
};
export default ControlRecognition;

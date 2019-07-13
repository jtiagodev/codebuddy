import React, { useState } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { runCameraRecognition as mapRecognition } from "../lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "../lib/solutionrecognition";
import { speak } from "../lib/speechSyntesis";

import { useStateValue } from "../components/StateManagement";

const CurrentlyIdentifying = ({ type }) => {
  return <span>Currently Identifying {type}</span>;
};

const ControlRecognition = () => {
  const [{ theme }, dispatch] = useStateValue();

  const [identifying, setIdentifying] = useState("Solution");

  return (
    <>
      <ButtonGroup minimal={true}>
        <Button
          id="Solution"
          icon="code"
          onClick={() => {
            dispatch({
              type: "changeTheme",
              newTheme: { primary: "blue" }
            });

            speak("Identifying Solution...");
            solutionRecognition();
          }}
        >
          Recognize Commands
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
          Recognize Board
        </Button>
      </ButtonGroup>
      <CurrentlyIdentifying type={identifying} />
    </>
  );
};
export default ControlRecognition;

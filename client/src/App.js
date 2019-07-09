import React, { useEffect } from "react";
import "./App.css";
import DefaultBoards from "./components/DefaultBoards";
import { executeRobot } from "./lib/execution";
import { runCameraRecognition as mapRecognition } from "./lib/maprecognition";
import { runCameraRecognition as solutionRecognition } from "./lib/solutionrecognition";

import { speak } from "./lib/speechSyntesis";
import { startSpeechFunction } from "./lib/voicerecognition";
import VideoCanvas from "./components/VideoCanvas";
import ControlRecognition from "./components/ControlRecognition";
const App = () => {
  console.log("APP RENDER");

  useEffect(() => {
    // speak(`Hello. I am kodi... let's learn to code together.`);
    // TODO: capture first answer
    // setUsername(capturedUsername);
    mapRecognition();
    executeRobot();
    startSpeechFunction();
    window.TopCodes.startStopVideoScan("video-canvas");
  }, []);

  return (
    <div className="App">
      <VideoCanvas />
      <DefaultBoards />
      <ControlRecognition />
      <p>VOICE STATUS:</p>
      <span className="voice-status">Listening...</span>
      <p>LAST VOICE COMMAND:</p>
      <span className="voice-last-message">listening...</span>
      <span className="voice-confidence" />
      <p>CURRENT SOLUTION:</p>
      <span className="solution-detected">waiting...</span>
      <span className="solution-detected-v2" />
      <p>INTERFACE WITH GROUP 1:</p>
      <span className="solution-g1" />
      <span style={{ fontSize: "14px" }}>* limited to commands available</span>

      <div onClick={() => executeRobot()}>
        <span>EXECUTE ROBOT!</span>
      </div>
    </div>
  );
};

export default App;

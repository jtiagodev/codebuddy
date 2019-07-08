import React, { useEffect, useState } from "react";
import "./App.css";
import VideoCanvas from "./VideoCanvas";
// import VoiceControls from "./VoiceControls";
import { runCameraRecognition as solutionRecognition } from "./lib/solutionrecognition";
import { runCameraRecognition as mapRecognition } from "./lib/maprecognition";
import { startSpeechFunction } from "./lib/voicerecognition";
import { speak } from "./lib/speechSyntesis";
import axios from "axios";

const App = () => {
  var [username, setUsername] = useState("Friend");

  const executeRobot = async () => {
    try {
      return await axios.post("http://localhost:3001/execute", {
        command: "python scriptCatarina.py [23,23,23,23]"
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    speak(
      "Hello. I am kodi... let's learn to code together. What is your name?"
    );
    // TODO: capture first answer
    // setUsername(capturedUsername);
    startSpeechFunction();
    //solutionRecognition();
    mapRecognition();
    window.TopCodes.startStopVideoScan("video-canvas");
  }, []);

  return (
    <div className="App">
      <VideoCanvas />
      {/* <VoiceControls /> */}

      <p>VOICE STATUS:</p>
      <span className="voice-status">Listening...</span>
      <p>LAST VOICE COMMAND:</p>
      <span className="voice-last-message">listening...</span>
      <span className="voice-message-confidence" />
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

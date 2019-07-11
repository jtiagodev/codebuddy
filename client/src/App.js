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

import ChangeLogs from "./components/ChangeLogs";
import LatestArtifacts from "./components/LatestArtifacts";
import ApplicationLinks from "./components/ApplicationLinks";
import DocumentationLinks from "./components/DocumentationLinks";
import Installer from "./components/Installer";
import Footer from "./components/Footer";
import { Flex } from "./components/Grid";

import {
  StateProvider,
  initialState,
  reducer
} from "./components/StateManagement";

import styled from "styled-components";

const Body = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background: #30404d;
  flex-direction: row;
  flex-wrap: wrap;
`;

const OneThirdFlex = styled(Flex)`
  flex-direction: column;
  flex: 1;
`;

const TwoThirdsFlex = styled(Flex)`
  flex-direction: column;
  flex: 2;
`;

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
      <StateProvider initialState={initialState} reducer={reducer}>
        <Body>
          <OneThirdFlex>
            <Installer>
              <VideoCanvas />
            </Installer>
            <DocumentationLinks />
            <ApplicationLinks />
          </OneThirdFlex>
          <TwoThirdsFlex>
            <LatestArtifacts />
            <ChangeLogs />
          </TwoThirdsFlex>

          {/* REMOVE THIS */}
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
          <span style={{ fontSize: "14px" }}>
            * limited to commands available
          </span>

          <div onClick={() => executeRobot()}>
            <span>EXECUTE ROBOT!</span>
          </div>
        </Body>
        <Footer />
      </StateProvider>
    </div>
  );
};

export default App;

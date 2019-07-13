import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import CameraBlocksDetection from "./components/CameraBlocksDetection";
import VideoModule from "./components/VideoModule";
import Footer from "./components/Footer";
import { Flex } from "./components/Grid";
import VoiceModule from "./components/VoiceModule";
import {
  initialState,
  reducer,
  StateProvider
} from "./components/StateManagement";
import VideoCanvas from "./components/VideoCanvas";
import { executeRobot } from "./lib/execution";
import { speak } from "./lib/speechSyntesis";

import { runCameraRecognition as mapRecognition } from "./lib/maprecognition";
import { startSpeechFunction } from "./lib/voicerecognition";
import SystemStatus from "./components/SystemStatus";

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
  // console.log("APP RENDER");

  useEffect(() => {
    speak(
      `Hello. I am kodi... let's learn to code together. What's your name?`
    );
    // TODO: capture first answer
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
            <CameraBlocksDetection>
              <VideoCanvas />
            </CameraBlocksDetection>
            <SystemStatus />
          </OneThirdFlex>
          <TwoThirdsFlex>
            <VoiceModule />
            <VideoModule />
          </TwoThirdsFlex>
        </Body>
        <Footer />
      </StateProvider>
    </div>
  );
};

export default App;

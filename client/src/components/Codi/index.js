/* eslint-disable */
import React, { useEffect } from "react";
import styled from "styled-components";
import CameraBlocksDetection from "../CameraBlocksDetection";
import Footer from "../Footer";
import { Flex } from "../Grid";
import {
  initialState,
  reducer,
  StateProvider,
  useStateValue
} from "../StateManagement";
import SystemStatus from "../SystemStatus";
import VideoCanvas from "../VideoCanvas";
import VideoModule from "../VideoModule";
import VoiceModule from "../VoiceModule";

import { runCameraRecognition as mapRecognition } from "../../lib/maprecognition";
import { speak } from "../../lib/speechSyntesis";
import { getUsername, startSpeechFunction } from "../../lib/voicerecognition";

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

const Codi = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    //speak("Hello. I'm Kodi, let's learn to code together. What's your name?");
    // Import Web Speech API

    speak("your name?");
    setTimeout(() => {}, 3000);

    const startUp = async () => {
      await getUsername()
        .then(res => {
          dispatch({
            type: "SET_USERNAME",
            userName: res
          });
          // executeRobot();
          mapRecognition();
          startSpeechFunction();
          window.TopCodes.startStopVideoScan("video-canvas");
        })
        .catch(err => {
          console.log(err);
        });
    };

    startUp();
  }, []);

  return (
    <Body>
      <OneThirdFlex>
        <CameraBlocksDetection>
          {/* <span>Hello friend</span> */}
          <VideoCanvas />
        </CameraBlocksDetection>
        <SystemStatus />
      </OneThirdFlex>
      <TwoThirdsFlex>
        <VoiceModule />
        <VideoModule />
      </TwoThirdsFlex>
    </Body>
  );
};

export default Codi;

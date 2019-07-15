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
  background: #edff8f;
  flex-direction: row;
  flex-wrap: wrap;
  opacity: 1;
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
  const [{ userName, status, system }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("USEEFFECT - STARTUP");
    speak("Hello. I'm Kodi, let's learn to code together. What's your name?");
    // Import Web Speech API

    // setTimeout(() => {}, 3000);

    const startUp = async () => {
      await getUsername()
        .then(res => {
          dispatch({
            type: "SET_USERNAME",
            userName: res
          });
          // executeRobot();
          mapRecognition();
          dispatch({
            type: "SET_SYSTEM_CAMERA",
            camera: "ONLINE: Recognizing Board"
          });

          startSpeechFunction();
          dispatch({
            type: "SET_SYSTEM_VOICE",
            voice: "LISTENING"
          });

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
          <VideoCanvas />
        </CameraBlocksDetection>
        <SystemStatus userName={userName} status={status} system={system} />
      </OneThirdFlex>
      <TwoThirdsFlex>
        <VoiceModule />
        <VideoModule />
      </TwoThirdsFlex>
    </Body>
  );
};

export default Codi;

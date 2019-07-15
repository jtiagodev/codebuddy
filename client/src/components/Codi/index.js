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
  const [state, dispatch] = useStateValue();

  const appActions = dispatch => {
    const setVoiceLastcommandDetected = lastCommandIdentified => {
      dispatch({
        type: "SET_VOICE_LASTCOMMANDDETECTED",
        lastCommandIdentified
      });
    };

    const setVoiceCommandAccuracy = lastCommandAccuracy => {
      dispatch({
        type: "SET_VOICE_LASTCOMMANDACCURACY",
        lastCommandAccuracy
      });
    };

    const setSystemVoiceStatus = voice => {
      dispatch({
        type: "SET_SYSTEM_VOICE",
        voice
      });
    };

    const setVoiceStatisticsSuccess = () => {
      dispatch({
        type: "SET_VOICE_STATISTICS_SUCCESS"
      });
    };

    const setVoiceStatisticsFailure = () => {
      dispatch({
        type: "SET_VOICE_STATISTICS_FAILURE"
      });
    };

    const setUsername = userName => {
      dispatch({
        type: "SET_USERNAME",
        userName
      });
    };

    const setStatus = userName => {
      dispatch({
        type: "SET_STATUS",
        userName
      });
    };

    const setSystemCameraStatus = camera => {
      dispatch({
        type: "SET_SYSTEM_CAMERA",
        camera
      });
    };

    const setSystemRobotStatus = robot => {
      dispatch({
        type: "SET_SYSTEM_ROBOT",
        robot
      });
    };

    const setConfigBoardSelected = boardSelected => {
      dispatch({
        type: "SET_CONFIG_BOARDSELECTED",
        boardSelected
      });
    };

    const setConfigRobotSelected = robotSelected => {
      dispatch({
        type: "SET_CONFIG_ROBOTSELECTED",
        robotSelected
      });
    };

    const setConfigBoardSize = boardSize => {
      dispatch({
        type: "SET_CONFIG_BOARDSIZE",
        boardSize
      });
    };

    const setConfigAvailableVoiceCommands = availableVoiceCommands => {
      dispatch({
        type: "SET_CONFIG_AVAILABLEVOICECOMMANDS",
        availableVoiceCommands
      });
    };

    const setVideoIdentifiedBoard = identifiedBoard => {
      dispatch({
        type: "SET_VIDEO_IDENTIFIEDBOARD",
        identifiedBoard
      });
    };

    const setVideoIdentifiedCommands = identifiedCommands => {
      dispatch({
        type: "SET_VIDEO_IDENTIFIEDCOMMANDS",
        identifiedCommands
      });
    };

    const setVideoCommandsInterfaceGroup1 = commandsInterfaceGroup1 => {
      dispatch({
        type: "SET_VIDEO_COMMANDSINTERFACEGROUP1",
        commandsInterfaceGroup1
      });
    };

    return {
      setVoiceLastcommandDetected,
      setVoiceCommandAccuracy,
      setSystemVoiceStatus,
      setVoiceStatisticsSuccess,
      setVoiceStatisticsFailure,
      setUsername,
      setStatus,
      setSystemCameraStatus,
      setSystemRobotStatus,
      setConfigBoardSelected,
      setConfigRobotSelected,
      setConfigBoardSize,
      setConfigAvailableVoiceCommands,
      setVideoIdentifiedBoard,
      setVideoIdentifiedCommands,
      setVideoCommandsInterfaceGroup1
    };
  };

  useEffect(() => {
    console.log("USEEFFECT - STARTUP");
    speak("Hello. I'm Kodi, let's learn to code together. What's your name?");
    setTimeout(() => {}, 5000);

    // let userName = "friend";

    const startUp = async () => {
      await getUsername()
        .then(res => {
          let userName = res;
          // STARTUP LOGIC GOES HERE

          appActions.setUsername(userName);
          mapRecognition();
          appActions.setSystemCameraStatus("recognizing board");
          startSpeechFunction(appActions(dispatch), userName);
          appActions.setSystemVoiceStatus("listening...");
          appActions.setStatus("online");
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

/* eslint-disable */
import React, { useEffect } from "react";
import styled from "styled-components";
import CameraBlocksDetection from "./components/CameraBlocksDetection";
import Footer from "./components/Footer";
import { Flex } from "./components/Grid";
import {
  initialState,
  reducer,
  StateProvider,
  useStateValue
} from "./components/StateManagement";
import SystemStatus from "./components/SystemStatus";
import VideoCanvas from "./components/VideoCanvas";
import VideoModule from "./components/VideoModule";
import VoiceModule from "./components/VoiceModule";
import Codi from "./components/Codi";
import "./App.css";

const App = () => {
  // console.log("APP RENDER");

  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <Codi />
        <Footer />
      </StateProvider>
    </div>
  );
};

export default App;

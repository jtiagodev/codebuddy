import React from "react";
import styled from "styled-components";
import { Flex } from "../Grid";
import BoxTitle from "./../BoxTitle";
import { useStateValue } from "../StateManagement";
import VideoPanel from "../VideoPanel";

const Wrapper = styled(Flex)`
  background: #82b6ff;
  height: 45%;
  margin: 0px 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  // border: 2px solid #232f38;
`;

const VideoModule = ({ children }) => {
  const [{ video }, dispatch] = useStateValue();
  const {
    identifiedBoard,
    identifiedCommands,
    identifiedCommmandsAsStrings,
    commandsInterfaceGroup1
  } = video;

  return (
    <Wrapper alignItems="start" style={{ flexDirection: "column" }}>
      <BoxTitle icon="camera" title="VIDEO MODULE" />
      {children}

      <VideoPanel
        identifiedBoard={identifiedBoard}
        identifiedCommands={identifiedCommands}
        identifiedCommmandsAsStrings={identifiedCommmandsAsStrings}
        commandsInterfaceGroup1={commandsInterfaceGroup1}
      />
    </Wrapper>
  );
};

export default VideoModule;

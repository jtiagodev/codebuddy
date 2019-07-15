import React from "react";
import styled from "styled-components";
import { Flex } from "../Grid";
import BoxTitle from "./../BoxTitle";

const Wrapper = styled(Flex)`
  background: #82b6ff;
  height: 45%;
  margin: 0px 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  // border: 2px solid #232f38;
`;

const VideoModule = ({ children }) => {
  return (
    <Wrapper alignItems="start" style={{ flexDirection: "column" }}>
      <BoxTitle icon="camera" title="VIDEO MODULE" />
      {children}

      <p style={{ color: "white" }}>
        <strong>CURRENT SOLUTION:</strong>
      </p>
      <span style={{ color: "white" }} className="solution-detected">
        waiting...
      </span>
      <span style={{ color: "white" }} className="solution-detected-v2" />
      <p style={{ color: "white" }}>
        <strong>INTERFACE WITH GROUP 1:</strong>
      </p>
      <span style={{ color: "white" }} className="solution-g1" />
      <p style={{ color: "white", fontSize: "14px" }}>
        * limited to commands available
      </p>
    </Wrapper>
  );
};

export default VideoModule;

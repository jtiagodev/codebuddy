import React from "react";
import styled from "styled-components";
import { Flex } from "../Grid";
import BoxTitle from "./../BoxTitle";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 45%;
  margin: 0px 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #232f38;
`;

const VideoModule = ({ children }) => {
  return (
    <Wrapper style={{ flexDirection: "column" }}>
      <BoxTitle icon="history" title="VIDEO MODULE" />
      {children}

      <p>CURRENT SOLUTION:</p>
      <span className="solution-detected">waiting...</span>
      <span className="solution-detected-v2" />
      <p>INTERFACE WITH GROUP 1:</p>
      <span className="solution-g1" />
      <span style={{ fontSize: "14px" }}>* limited to commands available</span>
    </Wrapper>
  );
};

export default VideoModule;

import React, { useState } from "react";
import styled from "styled-components";
import { colorPalette } from "../../theme/color-pallete";
import { Flex } from "../Grid";
import { Title, InstallerLink } from "../Typography";
import BoxTitle from "../BoxTitle";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 60%;
  margin: 2vh 2vh 0px 2vh;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid darkblue;
  opacity: 1;
`;

const LinkWrapper = styled(Flex)`
  padding: 10px;

  height: inherit;
  & > a:hover {
    color: red;
  }
`;

const CameraBlocksDetection = ({ children }) => {
  return (
    <Wrapper flexDirection="column">
      <BoxTitle icon="cloud-download" title="BLOCKS DETECTION" />
      {children}
    </Wrapper>
  );
};

export default CameraBlocksDetection;

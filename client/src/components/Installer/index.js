import React, { useState } from "react";
import styled from "styled-components";
import { colorPalette } from "./../../theme/color-pallete";
import { Flex } from "../Grid";
import { Title, InstallerLink } from "../Typography";
import BoxTitle from "../BoxTitle";

const Wrapper = styled(Flex)`
  background-repeat: no-repeat;
  background-position: 300px 35px;
  background-color: #282d35;
  background-size: auto 400px;
  height: 20vh;
  margin: 2vh 2vh 0px 2vh;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #9d1c24;
  opacity: 1;
`;

const LinkWrapper = styled(Flex)`
  padding: 10px;

  height: inherit;
  & > a:hover {
    color: red;
  }
`;

const Installer = ({ children }) => {
  const [currentInstaller, setCurrentInstaller] = useState("http://google.com");

  return (
    <Wrapper flexDirection="column">
      <BoxTitle icon="cloud-download" title="INSTALLER" />
      {children}
    </Wrapper>
  );
};

export default Installer;

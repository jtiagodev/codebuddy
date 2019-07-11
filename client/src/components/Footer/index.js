import React from "react";

import styled from "styled-components";
import { Flex, Box } from "../Grid";

const FooterContainer = styled(Flex)`
  padding: 0px 5px;
  margin-top: 10px;
  background-color: #282d35;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  z-index: 1600;
`;

const CopyrightText = styled(Box)`
  font-size: 9px;
  color: lightgrey;
  justify-self: center;
`;

const Footer = () => (
  <FooterContainer justifyContent="flex-end">
    <CopyrightText>
      <a href="https://www.fc.ul.pt">
        Joao Tiago, Catarina Fitas, Daniel São Pedro @LaSIGE
      </a>
    </CopyrightText>
  </FooterContainer>
);

export default Footer;

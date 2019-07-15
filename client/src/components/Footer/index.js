import React from "react";

import styled from "styled-components";
import { Flex, Box } from "../Grid";

const FooterContainer = styled(Flex)`
  padding: 0px 5px;
  margin-top: 10px;
  background-color: white;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  z-index: 1600;
`;

const CopyrightText = styled(Box)`
  font-size: 12px;
  color: black;
  justify-self: center;
`;

const Footer = () => (
  <FooterContainer justifyContent="flex-end">
    <CopyrightText>
      João Tiago, Catarina Fitas, Daniel São Pedro. 2018. LaSIGE, Faculdade de
      Ciências da Universidade de Lisboa (
      <a href="https://www.fc.ul.pt" target="_blank">
        fc.ul.pt
      </a>
      )
    </CopyrightText>
  </FooterContainer>
);

export default Footer;

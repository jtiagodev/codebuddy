import React from "react";
import { Title } from "../Typography";
import { colorPalette } from "./../../theme/color-pallete";
import styled from "styled-components";
import { Flex, Spacer } from "../Grid";
import BoxTitle from "../BoxTitle";
import { Button, Intent } from "@blueprintjs/core";
import _ from "lodash";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 30vh;
  margin: 0px 2vh 2vh 2vh;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #232f38;
`;

const ApplicationLinks = () => {
  return (
    <Wrapper className="bp3-dark" flexDirection="column">
      <BoxTitle icon="link" title="LINKS" />
    </Wrapper>
  );
};

export default ApplicationLinks;

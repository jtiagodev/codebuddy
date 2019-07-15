import { Cell } from "@blueprintjs/table";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import DefaultBoards from "../DefaultBoards";
import { useStateValue } from "../StateManagement";
import VoicePanel from "../VoicePanel";
import _ from "lodash";
import VoiceCommandsAvailable from "../VoiceCommandsAvailable";

const Wrapper = styled(Flex)`
  background: #84ff9f;
  height: 45%;
  margin: 2vh 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  // border: 2px solid #232f38;
`;

const VoiceModule = ({ children }) => {
  const [{ voice, config }, dispatch] = useStateValue();
  const { lastCommandAccuracy, lastCommandIdentified, statistics } = voice;
  const { availableVoiceCommands } = config;

  return (
    <Wrapper alignItems="start" flexDirection="column">
      {children}

      <BoxTitle icon="feed" title="VOICE MODULE" />

      <Flex flexDirection="row">
        <VoicePanel
          lastCommandIdentified={lastCommandIdentified}
          lastCommandAccuracy={lastCommandAccuracy}
          statistics={statistics}
        />

        <VoiceCommandsAvailable
          availableVoiceCommands={availableVoiceCommands}
        />
      </Flex>
    </Wrapper>
  );
};

export default VoiceModule;

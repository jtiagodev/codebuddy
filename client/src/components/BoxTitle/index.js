import React from "react";
import styled from "styled-components";
import { Title, InstallerLink } from "../Typography";
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Flex } from "../Grid";

const BoxTitle = ({ title, icon }) => {
  return (
    <Flex style={{ marginBottom: "10px" }}>
      <Icon
        icon={icon}
        style={{ height: "14px", margin: "2px 5px 0px 0px" }}
        color="white"
      />
      <Title>{title}</Title>
    </Flex>
  );
};

export default BoxTitle;

import React from "react";
import styled from "styled-components";
import { Flex } from "../Grid";
import BoxTitle from "./../BoxTitle";
import ProductTabs from "./../ProductTabs";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 52vh;
  margin: 0px 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #232f38;
`;

const ChangeLogs = () => {
  return (
    <Wrapper style={{ flexDirection: "column" }}>
      <BoxTitle icon="history" title="CHANGELOG" />

      <ProductTabs />
    </Wrapper>
  );
};

export default ChangeLogs;

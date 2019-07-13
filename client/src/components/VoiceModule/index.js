import { Cell } from "@blueprintjs/table";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import DefaultBoards from "../DefaultBoards";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 45%;
  margin: 2vh 2vh 2vh 0px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #232f38;
`;

const data = [
  {
    name: "XV-Agent-v1",
    type: "Agent",
    date: "20-02-2019 00:00:00",
    size: "20 Kb",
    link: "http://google.com"
  }
];

const cellRendererName = number => {
  return <Cell>{data[number].name}</Cell>;
};

const cellRendererType = number => {
  return <Cell>{data[number].type}</Cell>;
};

const cellRendererDate = number => {
  return <Cell>{data[number].date}</Cell>;
};

const cellRendererSize = number => {
  return <Cell>{data[number].size}</Cell>;
};

const cellRendererLink = number => {
  return <Cell>{data[number].link}</Cell>;
};

const VoiceModule = ({ children }) => {
  return (
    <Wrapper flexDirection="column">
      {children}

      <BoxTitle icon="layers" title="VOICE MODULE" />

      {/* <DefaultBoards /> */}
      <strong>
        <p style={{ color: "white" }}>VOICE STATUS:</p>
      </strong>
      <span style={{ color: "white" }} className="voice-status">
        Listening...
      </span>
      <strong>
        <p style={{ color: "white" }}>LAST VOICE COMMAND:</p>
      </strong>

      <span style={{ color: "white" }} className="voice-last-message" />
      <p style={{ color: "white" }} className="voice-confidence" />

      {/* <ContainerDimensions>
        {({ width, height }) => {
          let fifthWidth = width / 5 - 5;

          return (
            <Table
              className="bp3-dark"
              enableColumnResizing={false}
              allowMultipleSelection={false}
              selectionModes={SelectionModes.ROWS_AND_CELLS}
              numRows={1}
              columnWidths={[
                fifthWidth,
                fifthWidth,
                fifthWidth,
                fifthWidth,
                fifthWidth
              ]}
              enableRowHeader={false}
            >
              <Column name="Name" cellRenderer={cellRendererName} />
              <Column name="Type" cellRenderer={cellRendererType} />
              <Column name="Upload Date" cellRenderer={cellRendererDate} />
              <Column name="Size" cellRenderer={cellRendererSize} />
              <Column name="Download Link" cellRenderer={cellRendererLink} />
            </Table>
          );
        }}
      </ContainerDimensions> */}
    </Wrapper>
  );
};

export default VoiceModule;

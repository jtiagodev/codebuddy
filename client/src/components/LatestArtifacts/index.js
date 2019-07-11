import React from "react";
import { Title } from "../Typography";
import { colorPalette } from "./../../theme/color-pallete";
import styled from "styled-components";
import { Flex } from "../Grid";
import { Cell, Column, Table, SelectionModes } from "@blueprintjs/table";
import BoxTitle from "../BoxTitle";
import ContainerDimensions from "react-container-dimensions";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 40vh;
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

const LatestArtifacts = () => {
  return (
    <Wrapper flexDirection="column">
      <BoxTitle icon="layers" title="ARTIFACTS" />

      <ContainerDimensions>
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
      </ContainerDimensions>
    </Wrapper>
  );
};

export default LatestArtifacts;

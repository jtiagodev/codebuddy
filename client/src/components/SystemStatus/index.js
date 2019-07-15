import { Tree } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import LinksDef from "./links";
import { useStateValue } from "../StateManagement";
import ControlRecognition from "../ControlRecognition";

import { executeRobot } from "../../lib/execution";
import { Button } from "react-bootstrap";

const Wrapper = styled(Flex)`
  background: #ff9668;
  height: 30%;
  margin: 2vh;
  padding: 10px;
  border-radius: 5px;
  // border: 2px solid #232f38;
`;

// const Spacer = styled.div`
//   height: 10px;
// `;

// const cellRenderer = number => {
//   return <Cell>{`$${(number * 10).toFixed(2)}`}</Cell>;
// };

// const forEachNode = (nodes, callback) => {
//   if (nodes == null) {
//     return;
//   }

//   for (node in nodes) {
//     callback(node);
//     this.forEachNode(node.childNodes, callback);
//   }
// };

// const handleNodeClick = (nodeData, _nodePath, e) => {
//   const originallySelected = nodeData.isSelected;
//   if (!e.shiftKey) {
//     this.forEachNode(this.state.nodes, n => (n.isSelected = false));
//   }
//   nodeData.isSelected = originallySelected == null ? true : !originallySelected;
//   this.setState(this.state);
// };

// const handleNodeCollapse = nodeData => {
//   nodeData.isExpanded = false;
//   this.setState(this.state);
// };

// const handleNodeExpand = nodeData => {
//   nodeData.isExpanded = true;
//   this.setState(this.state);
// };

const SystemStatus = ({ userName, status, system, children }) => {
  // const renderStatus = status => {
  //   switch (status) {
  //     case "ONLINE":
  //       return <span style={{ color: "green" }}>{status}</span>;
  //     case "OFFLINE":
  //       return <span style={{ color: "red" }}>{status}</span>;
  //     case "PROCESSING":
  //       return <span style={{ color: "blue" }}>{status}</span>;
  //     case "LISTENING":
  //       return <span style={{ color: "green" }}>{status}</span>;
  //     case "RECOGNIZING":
  //       return <span style={{ color: "blue" }}>{status}</span>;
  //     default:
  //       return <span style={{ color: "blue" }}>{status}</span>;
  //   }
  // };

  return (
    <Wrapper className="bp3-dark" flexDirection="column">
      <BoxTitle icon="dashboard" title="SYSTEM STATUS" />
      {children}

      <span>{`HELLO ${userName}`}</span>
      <span>SYSTEM: {status.toUpperCase()}</span>
      <span>VOICE RECOGNITION: {system.voice.toUpperCase()}</span>
      <span>VIDEO RECOGNITION: {system.camera.toUpperCase()}</span>
      <br />
      <ControlRecognition />
      <br />
      <div onClick={() => executeRobot()}>
        <Button variant="primary">EXECUTE</Button>
      </div>
    </Wrapper>
  );
};

export default SystemStatus;

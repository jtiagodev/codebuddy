import { Tree } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import LinksDef from "./links";
import { useStateValue } from "../StateManagement";

import { executeRobot } from "../../lib/execution";
import { Button } from "react-bootstrap";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 30%;
  margin: 2vh;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #232f38;
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

const SystemStatus = ({ children }) => {
  const [{ status }, dispatch] = useStateValue();

  const systemStatus = status.system.toUpperCase();
  const voiceStatus = status.voice.toUpperCase();
  const videoStatus = status.video.toUpperCase();

  const renderStatus = status => {
    switch (status) {
      case "ONLINE":
        return <span style={{ color: "green" }}>{status}</span>;
        break;
      case "OFFLINE":
        return <span style={{ color: "red" }}>{status}</span>;
        break;
      case "PROCESSING":
        return <span style={{ color: "blue" }}>{status}</span>;
        break;
      case "LISTENING":
        return <span style={{ color: "green" }}>{status}</span>;
        break;
      case "RECOGNIZING":
        return <span style={{ color: "blue" }}>{status}</span>;
        break;
      default:
        return <span>{status}</span>;
        break;
    }
  };

  return (
    <Wrapper className="bp3-dark" flexDirection="column">
      <BoxTitle icon="document" title="SYSTEM STATUS" />
      {children}

      <span>SYSTEM:</span>
      {renderStatus(systemStatus)}
      <span>VOICE RECOGNITION:</span>
      {renderStatus(voiceStatus)}
      <span>VOICE RECOGNITION:</span>
      {renderStatus(videoStatus)}

      <div onClick={() => executeRobot()}>
        <Button variant="primary">EXECUTE</Button>
      </div>
    </Wrapper>
  );
};

export default SystemStatus;

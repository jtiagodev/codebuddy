import { Tree } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import { useStateValue } from "../StateManagement";
import StatusPanel from "../StatusPanel";

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

const SystemStatus = ({ children }) => {
  const [{ userName, status, system }, dispatch] = useStateValue();
  const { voice, camera } = system;

  return (
    <Wrapper className="bp3-dark" alignItems="start" flexDirection="column">
      <BoxTitle icon="dashboard" title="SYSTEM STATUS" />
      {children}

      <StatusPanel
        userName={userName}
        status={status}
        voice={voice}
        camera={camera}
      />
    </Wrapper>
  );
};

export default SystemStatus;

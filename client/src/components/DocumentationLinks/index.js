import { Tree } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import BoxTitle from "../BoxTitle";
import { Flex } from "../Grid";
import LinksDef from "./links";

const Wrapper = styled(Flex)`
  background: #27343e;
  height: 40vh;
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

const DocumentationLinks = () => {
  return (
    <Wrapper className="bp3-dark" flexDirection="column">
      <BoxTitle icon="document" title="DOCUMENTATION" />

      <Tree
        contents={LinksDef}
        // onNodeClick={handleNodeClick}
        // onNodeCollapse={handleNodeCollapse}
        // onNodeExpand={handleNodeExpand}
      />
    </Wrapper>
  );
};

export default DocumentationLinks;

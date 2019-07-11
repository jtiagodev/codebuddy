import { Tab, Tabs } from "@blueprintjs/core";
import React, { useState } from "react";

const ProductTabs = () => {
  const [tabOpened, setTabOpened] = useState("frontend");

  const handleTabChange = tabId => {
    setTabOpened(tabId);
  };

  return (
    <Tabs
      className="bp3-dark"
      id="TabsExample"
      onChange={handleTabChange}
      selectedTabId={tabOpened}
    >
      <Tab id="frontend" title="FRONTEND" panel={<span>hi</span>} />
      <Tab id="backend" title="BACKEND" panel={<span>hi2</span>} />
      <Tab id="agent" title="AGENT" panel={<span>hi3</span>} />
    </Tabs>
  );
};

export default ProductTabs;

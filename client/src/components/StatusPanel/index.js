import React from "react";

import ControlRecognition from "../ControlRecognition";

const statusRenderer = status => {
  switch (status) {
    case "online":
      return (
        <span style={{ fontFamily: "Delius Swash Caps", color: "darkgreen" }}>
          <strong>{status}</strong>
        </span>
      );

    case "offline":
      return (
        <span style={{ fontFamily: "Delius Swash Caps", color: "darkred" }}>
          <strong>{status}</strong>
        </span>
      );
    default:
      return (
        <span style={{ fontFamily: "Delius Swash Caps", color: "darkblue" }}>
          <strong>{status}</strong>
        </span>
      );
  }
};

const StatusPanel = ({ userName, status, voice, camera }) => {
  return (
    <>
      <span
        style={{ fontFamily: "Delius Swash Caps", color: "black" }}
      >{`Hello ${userName},`}</span>
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        CodeBuddy is {statusRenderer(status.toLowerCase())}
      </span>
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Voice Recognition is {statusRenderer(voice.toLowerCase())}
      </span>
      <span style={{ fontFamily: "Delius Swash Caps", color: "black" }}>
        Video Recognition is {statusRenderer(camera.toLowerCase())}
      </span>
      <br />
      <ControlRecognition />
    </>
  );
};

export default StatusPanel;

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

const StatusPanel = ({ userName, status, voice, camera, executed }) => {
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
      <ControlRecognition />
      {executed !== "" && (
        <span
          style={{
            fontFamily: "Delius Swash Caps",
            fontSize: "10px",
            color: "black"
          }}
        >
          Executed...{" "}
          <span
            style={{
              fontFamily: "Delius Swash Caps",
              fontSize: "10px",
              color: "darkgreen"
            }}
          >
            {executed}
          </span>
        </span>
      )}
    </>
  );
};

export default StatusPanel;

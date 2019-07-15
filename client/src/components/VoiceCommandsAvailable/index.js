import React from "react";
import _ from "lodash";

const VoiceCommandsAvailable = ({ availableVoiceCommands }) => {
  return (
    <table>
      <thead>
        <tr>
          <th
            style={{
              fontFamily: "Delius Swash Caps",
              color: "black"
            }}
          >
            Voice Command
          </th>
          <th
            style={{
              fontFamily: "Delius Swash Caps",
              color: "black"
            }}
          >
            Triggered by
          </th>
        </tr>
      </thead>
      <tbody>
        {_.map(availableVoiceCommands, (voiceCommand, i) => (
          <tr key={i}>
            <td>
              <span
                style={{
                  fontFamily: "Delius Swash Caps",
                  fontSize: "9px",
                  color: "black"
                }}
              >
                {voiceCommand.command}
              </span>
            </td>
            <td>
              <span
                style={{
                  fontFamily: "Delius Swash Caps",
                  fontSize: "9px",
                  color: "black"
                }}
              >
                {voiceCommand.format}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoiceCommandsAvailable;

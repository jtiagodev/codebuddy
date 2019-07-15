import React from "react";
import { Doughnut } from "react-chartjs-2";

const VoicePanel = ({
  lastCommandIdentified,
  lastCommandAccuracy,
  statistics
}) => {
  const { recognized, unrecognized } = statistics;

  return (
    <>
      {lastCommandIdentified !== "" && (
        <p>
          <span style={{ color: "black", fontFamily: "Bubblegum Sans" }}>
            {`Last identified voice was `}
          </span>
          <strong>
            <span style={{ color: "#007BFF", fontFamily: "Bubblegum Sans" }}>
              {lastCommandIdentified}
            </span>
          </strong>
          <span style={{ color: "black", fontFamily: "Bubblegum Sans" }}>
            {` with an accuracy of ${lastCommandAccuracy}%`}
          </span>
        </p>
      )}

      {lastCommandIdentified !== "" && (
        <Doughnut
          width={150}
          data={{
            datasets: [
              {
                data: [recognized, unrecognized]
              }
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ["Valid Intent", "Invalid Intent"]
          }}
        />
      )}
    </>
  );
};

export default VoicePanel;

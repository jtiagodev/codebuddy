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
        <div style={{ width: "250px" }}>
          <Doughnut
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
        </div>
      )}
    </>
  );
};

export default VoicePanel;

import React from "react";

export const FrameGapSelector = ({ frameGap, handleFrameGapChange }) => {
  const options = [3, 5, 10, 12];

  return (
    <div
      style={{
        width: "100%",
        margin: "2em",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <label
        style={{
          fontSize: "0.96em",
        }}
      >
        Frame Gap is
      </label>

      <select
        name="frame_gap_seconds"
        value={frameGap}
        onChange={handleFrameGapChange}
        style={{
          borderRadius: "50px",
          fontSize: "0.96em",
          padding: "0.7em 2em",
          border: "none",
          outline: "none",
        }}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option} sec
          </option>
        ))}
      </select>
    </div>
  );
};

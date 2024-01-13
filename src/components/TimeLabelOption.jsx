import React, { useState } from "react";

const TimeLabelOption = () => {
  const [timeLabel, setTimeLabel] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5em",
      }}
      onClick={() => {
        setTimeLabel(!timeLabel);
      }}
    >
      <label>
        {timeLabel ? "Include time label" : "Don't include time label"}
      </label>
      <input type="checkbox" name="include_time_label" checked={timeLabel} />
    </div>
  );
};

export default TimeLabelOption;

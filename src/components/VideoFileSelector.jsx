import React, { useRef } from "react";

export const VideoFileSelector = ({ handleVideoChange }) => {
  const videoFileSelectorInputRef = useRef(null);

  return (
    <div
      style={{
        padding: "10px",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <button
        style={{
          width: "100%",
          padding: "10px 30px",
          outline: "none",
          border: "none",
          borderRadius: "9px",
          backgroundColor: "#ff3636",
          color: "white",
          fontWeight: "600",
          fontSize: "1.1em",
        }}
        onClick={() => {
          videoFileSelectorInputRef.current.click();
        }}
      >
        Select Video
        <input
          type="file"
          name="video"
          accept="video/*"
          required
          hidden
          ref={videoFileSelectorInputRef}
          onChange={(e) => {
            handleVideoChange(e);
          }}
        />
      </button>
    </div>
  );
};

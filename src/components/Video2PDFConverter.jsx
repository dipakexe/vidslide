import React, { useRef, useState } from "react";
import { FormContainer } from "./FormContainer";
import { ConvertButton } from "./ConvertButton";
import { VideoFileSelector } from "./VideoFileSelector";
import { FormHeader } from "./FormHeader";
import { FrameGapSelector } from "./FrameGapSelector";
import LoaderAnimation from "./LoaderAnimation";
import TimeLabelOption from "./TimeLabelOption";

const Video2PDFConverter = () => {
  const formRef = useRef(null);

  const [videoFilename, setVideoFilename] = useState("video.mp4");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [frameGap, setFrameGap] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (formRef.current.reportValidity()) {
      const formData = new FormData(formRef.current);

      try {
        setIsLoading(true);

        const response = await fetch("/video2slide", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = videoFilename + ".pdf";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          const error = await response.json();
          alert(error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  const isValidFileSelected = (files) => {
    let result = false;

    if (files.length > 0) {
      const extension = files[0].name.split(".").at(-1);
      const file_size = files[0].size;
      const file_size_limit_in_MBs = 50 * Math.pow(10, 6); // 50 MBs

      switch (extension) {
        case "mp4":
        case "3gp":
        case "avi":
          if (file_size < file_size_limit_in_MBs) {
            result = true;
          }

        default:
          break;
      }
    }

    return result;
  };

  const handleVideoChange = (e) => {
    if (isValidFileSelected(e.target.files)) {
      const file = e.target.files[0];
      setVideoFilename(file.name);
      setSelectedVideo(file);
    } else {
      alert("Select a valid file.");
      setVideoFilename("video.mp4");
    }
  };

  const handleFrameGapChange = (e) => {
    const gap = parseInt(e.target.value, 10);
    setFrameGap(gap);
  };

  return (
    <FormContainer>
      <form
        ref={formRef}
        action="/"
        method="post"
        encType="multipart/form-data"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          borderRadius: "9px",
          width: "96%",
          maxWidth: "700px",
          margin: "4em auto",
          padding: "1.5em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "20px",
          boxShadow:
            "2px 0px 4px rgba(201, 201, 201, 0.84)" +
            ", " +
            "inset 0px 0px 3px rgba(169, 170, 217, 0.84)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormHeader />

        <FrameGapSelector
          frameGap={frameGap}
          handleFrameGapChange={handleFrameGapChange}
        />
        <TimeLabelOption />

        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <VideoFileSelector handleVideoChange={handleVideoChange} />
          <ConvertButton handleFormSubmission={handleFormSubmission} />
        </div>

        {isLoading && <LoaderAnimation />}
      </form>
    </FormContainer>
  );
};

export default Video2PDFConverter;

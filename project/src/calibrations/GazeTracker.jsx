import React, { useEffect, useRef, useState } from "react";
import Calibration from "./Calibration";
import "./GazeTracker.css";

const GazeTracker = ({setIsCalibrated}) => {
  const gazeRef = useRef(null);
  const [webgazerReady, setWebgazerReady] = useState(false);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    const initWebgazer = async () => {
      if (window.webgazer) {
        try {
          await window.webgazer
            .setGazeListener((data, timestamp) => {
              if (data == null) return;

              const { x, y } = data;
              const gazeDot = gazeRef.current;

              if (gazeDot) {
                gazeDot.style.left = x + "px";
                gazeDot.style.top = y + "px";
                gazeDot.style.display = "block";
              }
            })
            .begin();

          window.webgazer.params.showVideo = true;
          window.webgazer.params.showFaceOverlay = true;
          window.webgazer.params.showFaceFeedbackBox = true;
          window.webgazer.params.showPointPrediction = true;

          setWebgazerReady(true);
        } catch (error) {
          console.error("Error initializing webgazer:", error);
        }
      } else {
        console.error("webgazer is not available");
      }
    };

    initWebgazer();

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);

  const startCalibration = () => {
    if (window.webgazer && webgazerReady) {
      setCalibrating(true);
      window.webgazer.showPredictionPoints(true);
    } else {
      console.error("webgazer is not ready");
    }
  };

  const handleCalibrationComplete = () => {
    setCalibrating(false);
    console.log("Calibration complete");
    setIsCalibrated(true)
    // You can add additional logic here, such as storing calibration data
    window.webgazer.showPredictionPoints(false); // Hide prediction points after calibration
  };

  return (
    <>
    <div
      className="gaze-tracker-container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        height: `100%`,
        width: "75%", // equivalent to w-8/10
        backgroundColor: "#2d3748", // equivalent to bg-base-300
        borderRadius: "0.5rem", // equivalent to rounded-box
        padding: "1rem", // equivalent to place-items-center
        border: "2px solid white", // equivalent to border-2 border-white
        verticalAlign: "middle", // equivalent to align-middle
      }}
    >
      <div className="controls">
        {/* <button
          onClick={startCalibration}
          disabled={!webgazerReady || calibrating}
        >
          Start Calibration
        </button> */}
      </div>
      {calibrating && (
        <Calibration
          webgazer={window.webgazer}
          onCalibrationComplete={handleCalibrationComplete}
        />
      )}
      <div ref={gazeRef} className="gaze-dot" />
    </div>
    <div
    style={{
      height: "1px",
      backgroundColor: "#d1d5db",
      margin: "1rem 0",
    }}
  ></div>{" "}
  <div
    style={{
      display: "grid",
      height: "100%",
      padding: "1rem",
      width: "25%",
      backgroundColor: "#2d3748",
      borderRadius: "0.5rem",
      placeItems: "center",
    }}
  >
    <button onClick={startCalibration}
          style={{fontSize:"70px", padding: "20px", borderRadius: "25px"}}
          disabled={!webgazerReady || calibrating}>
          Start Calibration
        </button>
  </div>
  </>
  );
};

export default GazeTracker;

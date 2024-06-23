import React, { useState, useEffect, useRef } from "react";
import "./Calibration.css";

const Calibration = ({ webgazer, onCalibrationComplete }) => {
  const [calibrationPoints, setCalibrationPoints] = useState({});
  const [gazeData, setGazeData] = useState({});

  const calibrationRefs = useRef([]);

  useEffect(() => {
    showCalibrationPoints();

    // Set up WebGazer to collect gaze data
    if (webgazer) {
      webgazer.setGazeListener((data, elapsedTime) => {
        if (data == null) return;
        const { x, y } = data;
        const activePointId = Object.keys(calibrationPoints).find(
          (key) => calibrationPoints[key] > 0 && calibrationPoints[key] < 5
        );
        if (activePointId) {
          setGazeData((prevData) => {
            const newData = { ...prevData };
            if (!newData[activePointId]) {
              newData[activePointId] = [];
            }
            newData[activePointId].push({ x, y });
            return newData;
          });
        }
      }).begin();
    }

    return () => {
      if (webgazer) {
        webgazer.end();
      }
    };
  }, [webgazer, calibrationPoints]);

  

  const showCalibrationPoints = () => {
    calibrationRefs.current.forEach((point) => {
      point.style.removeProperty("display");
    });
  };

  const calPointClick = (id) => {
    setCalibrationPoints((prev) => {
      const newPoints = { ...prev };
      if (!newPoints[id]) {
        newPoints[id] = 0;
      }
      newPoints[id]++;

      const node = document.getElementById(id);
      if (newPoints[id] === 5) {
        node.style.setProperty("background-color", "yellow");
        node.setAttribute("disabled", "disabled");
      } else {
        const opacity = 0.2 * newPoints[id] + 0.2;
        node.style.setProperty("opacity", opacity);
      }

      // Check if all points are calibrated
      if (
        Object.entries(newPoints).filter(([_, value]) => value >= 5).length ===
        9
      ) {
        setTimeout(() => {
          onCalibrationComplete();
        }, 1000);
      }

      return newPoints;
    });
  };

  return (
    <div id="calibration">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <div
          key={num}
          id={`Pt${num}`}
          className="Calibration"
          onClick={() => calPointClick(`Pt${num}`)}
          ref={(el) => (calibrationRefs.current[num] = el)}
        ></div>
      ))}
    </div>
  );
};

export default Calibration;

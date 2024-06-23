import React, { useState, useEffect, useRef } from 'react';
import './Calibration.css';

const Calibration = ({ webgazer, onCalibrationComplete }) => {
  const [calibrationPoints, setCalibrationPoints] = useState({});
  const calibrationRefs = useRef([]);

  useEffect(() => {
    showCalibrationPoints();
  }, []);

  const showCalibrationPoints = () => {
    calibrationRefs.current.forEach((point) => {
      point.style.removeProperty('display');
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
        node.style.setProperty('background-color', 'yellow');
        node.setAttribute('disabled', 'disabled');
      } else {
        const opacity = 0.2 * newPoints[id] + 0.2;
        node.style.setProperty('opacity', opacity);
      }

      // Check if all points are calibrated
      if (Object.entries(newPoints).filter(([_, value]) => value >= 5).length === 9) {
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






// import React, { useState, useEffect } from 'react';
// import './Calibration.css';
//
// const Calibration = ({ webgazer, onCalibrationComplete }) => {
//   const [calibrationPoints, setCalibrationPoints] = useState({});
//
//   useEffect(() => {
//     showCalibrationPoint();
//   }, []);
//
//   const showCalibrationPoint = () => {
//     document.querySelectorAll('.Calibration').forEach((i) => {
//       i.style.removeProperty('display');
//     });
//     document.getElementById('Pt5').style.setProperty('display', 'none');
//   };
//
//   const calPointClick = (id) => {
//     setCalibrationPoints((prev) => {
//       const newPoints = { ...prev };
//       if (!newPoints[id]) {
//         newPoints[id] = 0;
//       }
//       newPoints[id]++;
//
//       const node = document.getElementById(id);
//       if (newPoints[id] === 5) {
//         node.style.setProperty('background-color', 'yellow');
//         node.setAttribute('disabled', 'disabled');
//       } else {
//         const opacity = 0.2 * newPoints[id] + 0.2;
//         node.style.setProperty('opacity', opacity);
//       }
//
//       // Check if 8 points (excluding middle) are calibrated
//       const calibratedPoints = Object.entries(newPoints).filter(
//         ([key, value]) => key !== 'Pt5' && value >= 5
//       );
//
//       if (calibratedPoints.length === 8) {
//         document.getElementById('Pt5').style.removeProperty('display');
//       }
//
//       // Check if all points are calibrated
//       if (Object.entries(newPoints).filter(([_, value]) => value >= 5).length === 9) {
//         setTimeout(() => {
//           onCalibrationComplete();
//         }, 1000);
//       }
//
//       return newPoints;
//     });
//   };
//
//   return (
//     <div id="calibration">
//       {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//         <div
//           key={num}
//           id={`Pt${num}`}
//           className={`Calibration ${num === 5 ? 'hidden' : ''}`}
//           onClick={() => calPointClick(`Pt${num}`)}
//         ></div>
//       ))}
//     </div>
//   );
// };
//
// export default Calibration;
// import React, { useState, useEffect } from 'react';
// import './Calibration.css';
//
// const Calibration = ({ webgazer, onCalibrationComplete }) => {
//   const [calibrationPoints, setCalibrationPoints] = useState({});
//   const [pointsCalibrated, setPointsCalibrated] = useState(0);
//
//   useEffect(() => {
//     showCalibrationPoint();
//   }, []);
//
//   const showCalibrationPoint = () => {
//     document.querySelectorAll('.Calibration').forEach((i) => {
//       i.style.removeProperty('display');
//     });
//     document.getElementById('Pt5').style.setProperty('display', 'none');
//   };
//
//   const calPointClick = (id) => {
//     setCalibrationPoints((prev) => {
//       const newPoints = { ...prev };
//       if (!newPoints[id]) {
//         newPoints[id] = 0;
//       }
//       newPoints[id]++;
//
//       const node = document.getElementById(id);
//       if (newPoints[id] === 5) {
//         node.style.setProperty('background-color', 'yellow');
//         node.setAttribute('disabled', 'disabled');
//         setPointsCalibrated((prev) => prev + 1);
//       } else {
//         const opacity = 0.2 * newPoints[id] + 0.2;
//         node.style.setProperty('opacity', opacity);
//       }
//
//       if (Object.keys(newPoints).length === 9 && Object.values(newPoints).every(val => val >= 5)) {
//         onCalibrationComplete();
//       }
//
//       return newPoints;
//     });
//   };
//
//   return (
//     <div id="calibration">
//       {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//         <div
//           key={num}
//           id={`Pt${num}`}
//           className={`Calibration ${num === 5 ? 'hidden' : ''}`}
//           onClick={() => calPointClick(`Pt${num}`)}
//         ></div>
//       ))}
//     </div>
//   );
// };
//
// export default Calibration;
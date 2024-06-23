import React, { useEffect, useRef, useState } from 'react';
import Calibration from './Calibration';
import './GazeTracker.css';

const GazeTracker = () => {
  const gazeRef = useRef(null);
  const [webgazerReady, setWebgazerReady] = useState(false);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    const initWebgazer = async () => {
      if (window.webgazer) {
        try {
          await window.webgazer.setGazeListener((data, timestamp) => {
            if (data == null) return;

            const { x, y } = data;
            const gazeDot = gazeRef.current;

            if (gazeDot) {
              gazeDot.style.left = x + 'px';
              gazeDot.style.top = y + 'px';
              gazeDot.style.display = 'block';
            }
          }).begin();

          window.webgazer.params.showVideo = true;
          window.webgazer.params.showFaceOverlay = true;
          window.webgazer.params.showFaceFeedbackBox = true;
          window.webgazer.params.showPointPrediction = true;

          setWebgazerReady(true);
        } catch (error) {
          console.error('Error initializing webgazer:', error);
        }
      } else {
        console.error('webgazer is not available');
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
      console.error('webgazer is not ready');
    }
  };

  const handleCalibrationComplete = () => {
    setCalibrating(false);
    console.log('Calibration complete');
    // You can add additional logic here, such as storing calibration data
    window.webgazer.showPredictionPoints(false); // Hide prediction points after calibration
  };

  return (
    <div className="gaze-tracker-container">
      <div className="controls">
        <h1>WebGazer.js Calibration and Gaze Tracking</h1>
        <button onClick={startCalibration} disabled={!webgazerReady || calibrating}>
          Start Calibration
        </button>
      </div>
      {calibrating && (
        <Calibration
          webgazer={window.webgazer}
          onCalibrationComplete={handleCalibrationComplete}
        />
      )}
      <div ref={gazeRef} className="gaze-dot" />
    </div>
  );
};

export default GazeTracker;
// // import React, { useEffect, useRef, useState } from 'react';
// // import Calibration from './Calibration';
// // import './GazeTracker.css';
// //
// // const GazeTracker = () => {
// //   const gazeRef = useRef(null);
// //   const [webgazerReady, setWebgazerReady] = useState(false);
// //   const [calibrating, setCalibrating] = useState(false);
// //
// //   useEffect(() => {
// //     const initWebgazer = async () => {
// //       if (window.webgazer) {
// //         try {
// //           await window.webgazer.setGazeListener((data, timestamp) => {
// //             if (data == null) return;
// //
// //             const { x, y } = data;
// //             const gazeDot = gazeRef.current;
// //
// //             if (gazeDot) {
// //               gazeDot.style.left = x + 'px';
// //               gazeDot.style.top = y + 'px';
// //               gazeDot.style.display = 'block';
// //             }
// //           }).begin();
// //
// //           window.webgazer.params.showVideo = true;
// //           window.webgazer.params.showFaceOverlay = true;
// //           window.webgazer.params.showFaceFeedbackBox = true;
// //           window.webgazer.params.showPointPrediction = true;
// //
// //           setWebgazerReady(true);
// //         } catch (error) {
// //           console.error('Error initializing webgazer:', error);
// //         }
// //       } else {
// //         console.error('webgazer is not available');
// //       }
// //     };
// //
// //     initWebgazer();
// //
// //     return () => {
// //       if (window.webgazer) {
// //         window.webgazer.end();
// //       }
// //     };
// //   }, []);
// //
// //   const startCalibration = () => {
// //     if (window.webgazer && webgazerReady) {
// //       setCalibrating(true);
// //       window.webgazer.showPredictionPoints(true);
// //     } else {
// //       console.error('webgazer is not ready');
// //     }
// //   };
// //
// //   const handleCalibrationComplete = () => {
// //     setCalibrating(false);
// //     // You can add additional logic here, such as storing calibration data
// //     console.log('Calibration complete');
// //   };
// //
// //   return (
// //     <div className="gaze-tracker-container">
// //       <div className="controls">
// //         <h1>WebGazer.js Calibration and Gaze Tracking</h1>
// //         <button onClick={startCalibration} disabled={!webgazerReady || calibrating}>
// //           Start Calibration
// //         </button>
// //       </div>
// //       {calibrating && (
// //         <Calibration
// //           webgazer={window.webgazer}
// //           onCalibrationComplete={handleCalibrationComplete}
// //         />
// //       )}
// //       <div ref={gazeRef} className="gaze-dot" />
// //     </div>
// //   );
// // };
// //
// // export default GazeTracker;
// // import React, { useEffect, useRef, useState } from 'react';
// // import './GazeTracker.css'; // We'll create this file for styles
// //
// // const GazeTracker = () => {
// //   const gazeRef = useRef(null);
// //   const [webgazerReady, setWebgazerReady] = useState(false);
// //
// //   useEffect(() => {
// //     const initWebgazer = async () => {
// //       if (window.webgazer) {
// //         try {
// //           await window.webgazer.setGazeListener((data, timestamp) => {
// //             if (data == null) return;
// //
// //             const { x, y } = data;
// //             const gazeDot = gazeRef.current;
// //
// //             if (gazeDot) {
// //               gazeDot.style.left = x + 'px';
// //               gazeDot.style.top = y + 'px';
// //               gazeDot.style.display = 'block';
// //             }
// //           }).begin();
// //
// //           // Set up WebGazer video feed
// //           window.webgazer.params.showVideo = true;
// //           window.webgazer.params.showFaceOverlay = true;
// //           window.webgazer.params.showFaceFeedbackBox = true;
// //           window.webgazer.params.showPointPrediction = true;
// //
// //           setWebgazerReady(true);
// //         } catch (error) {
// //           console.error('Error initializing webgazer:', error);
// //         }
// //       } else {
// //         console.error('webgazer is not available');
// //       }
// //     };
// //
// //     initWebgazer();
// //
// //     return () => {
// //       if (window.webgazer) {
// //         window.webgazer.end();
// //       }
// //     };
// //   }, []);
// //
// //   const startCalibration = () => {
// //     if (window.webgazer && webgazerReady) {
// //       window.webgazer.showPredictionPoints(true);
// //       // Add your calibration logic here
// //     } else {
// //       console.error('webgazer is not ready');
// //     }
// //   };
// //
// //   return (
// //     <div className="gaze-tracker-container">
// //       <div className="controls">
// //         <h1>WebGazer.js Calibration and Gaze Tracking</h1>
// //         <button onClick={startCalibration} disabled={!webgazerReady}>
// //           Start Calibration
// //         </button>
// //       </div>
// //       <div
// //         ref={gazeRef}
// //         className="gaze-dot"
// //       />
// //     </div>
// //   );
// // };
// //
// // export default GazeTracker;
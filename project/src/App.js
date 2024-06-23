import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import ReadScreen from "./components/ReadScreen";
import pdfToText from "react-pdftotext";
import heroImg from "./heroImg.jpg";

function App() {
  const [submitPDF, setSubmitPDF] = useState(false);
  const [extractedText, setExtractedText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has"
  );

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => setExtractedText(text))
      .catch((error) => console.error("Failed to extract text from pdf"));
    setSubmitPDF(true);
  };

  useEffect(() => {}, [submitPDF]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "97vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {submitPDF ? (
        <ReadScreen extractedText={extractedText}/>
      ) : (
        <>
          <div
            style={{
              height: "100%",
              width: "50%",
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
          <div
            style={{
              display: "grid",
              height: "100%",
              padding: "1rem",
              width: "50%",
              placeItems: "center",
            }}
          >
            <div className="card-body">
              <h1
                style={{
                  fontSize: "170px",
                  fontFamily: "sans-serif",
                  color: "#ff007f",
                  margin: "0px",
                }}
              >
                InsightAI
              </h1>
              <h1 style={{fontSize:"70px", fontFamily: "sans-serif", marginTop: "20px"}}>
                let's read --{">"}{" "}
                <button
                  className="button-upload"
                  style={{
                    color: "white",
                    background: "linear-gradient(to right, #ff007f, #ffafbd)",
                    fontSize: "50px",
                    borderRadius: "5px",
                    padding: "10px",
                    fontWeight: "bold",
                    border: "0px",
                  }}
                  onClick={handleClick}
                >
                  Upload a file
                </button>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }} // Make the file input element invisible
                />
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

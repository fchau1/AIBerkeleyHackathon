import "./App.css";
import React, { useState, useEffect } from "react";
import PDFPanel from "./components/PDFPanel";
import pdfToText from "react-pdftotext";

function App() {
  const [submitPDF, setSubmitPDF] = useState(false);
  const [extractedText, setExtractedText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has"
  );


const handleFileChange = (event) => {
    const file = event.target.files[0];
    pdfToText(file)
        .then((text) => setExtractedText(text))
        .catch((error) => console.error("Failed to extract text from pdf"));
    setSubmitPDF(true);
    };

    useEffect(()=>{

    },[submitPDF])

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "95vh", width: "100%",  boxSizing: "border-box" }}>
      {submitPDF ? <>
      <PDFPanel extractedText={extractedText} />
        <div style={{ height: "1px", backgroundColor: "#d1d5db", margin: "1rem 0" }}></div> {/* equivalent to divider */}
        <div style={{ display: "grid", height: "100%", padding: "1rem", width: "25%", backgroundColor: "#2d3748", borderRadius: "0.5rem", placeItems: "center" }}></div>
        </> :
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input file-input-xs file-input-bordered file-input-primary w-full grid card bg-base-300 rounded-box place-items-center" />
      }
    </div>
  );
}

export default App;

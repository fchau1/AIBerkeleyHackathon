import './App.css';
import React, { useState } from 'react';
import PDFReader from './components/PDFReader';
import PDFPanel from './components/PDFPanel';
import pdfToText from "react-pdftotext";

function App() {
  const [extractedText, setExtractedText] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    pdfToText(file)
    .then((text) => setExtractedText(text))

    .catch((error) => console.error("Failed to extract text from pdf"));
  };


  return (

<div className="App h-screen">
      <header className="App-header h-full">
        {/* <div className="flex flex-col w-full h-full"> */}
          {/* <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input file-input-xs file-input-bordered file-input-primary w-full grid card bg-base-300 rounded-box place-items-center" /> */}
          
          <div className=
          "flex flex-col h-full w-full lg:flex-row py-4"
          >
            <PDFPanel extractedText={extractedText}/>
            <div className="divider lg:divider-horizontal"></div>
            <div className="grid h-full py-4 w-3/10 card bg-base-300 rounded-box place-items-center"></div>
          </div>
        {/* </div>  */}
      </header>
    </div>

  );
};

export default App;

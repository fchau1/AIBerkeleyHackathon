import React, { useMemo, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import Tile from "./Tile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import GazeTracker from "../calibrations/GazeTracker";

interface PDFPanelProps {
  extractedText: string;
}

const PDFPanel: React.FC<PDFPanelProps> = ({ extractedText }) => {
  const [isCalibrated, setIsCalibrated] = useState(true);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const charsPerPage = 300;

  const pageBreaks = useMemo(() => {
    const breaks = [0];
    let currentIndex = 0;

    while (currentIndex < extractedText.length) {
      let spaceIndex = extractedText.lastIndexOf(
        " ",
        currentIndex + charsPerPage
      );
      if (spaceIndex <= currentIndex || spaceIndex === -1) {
        spaceIndex = Math.min(
          currentIndex + charsPerPage,
          extractedText.length
        );
      }
      breaks.push(spaceIndex);
      currentIndex = spaceIndex;
    }

    return breaks;
  }, [extractedText, charsPerPage]);

  const pages = pageBreaks.length - 1;

  const handlePrevious = () => {
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex(Math.min(pages - 1, currentPageIndex + 1));
  };

  const currentPageText = extractedText.substring(
    pageBreaks[currentPageIndex],
    pageBreaks[currentPageIndex + 1]
  );

  const tiles = currentPageText.split(/\s+/).map((word, index) => ({
    isHighlighted: true,
    word: word,
    totalWidth: 0,
  }));

  return (
    <>
      {isCalibrated ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "75%",
            margin: "auto",
            backgroundColor: "#2d3748",
            borderRadius: "0.5rem",
            padding: "1rem",
            border: "2px solid white",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "flex-start",
              overflowY: "auto",
              fontSize: "3.75rem",
              lineHeight: "1.375",
              textAlign: "left",
            }}
          >
            {tiles.map((tile, index) => (
              <Tile key={index} tile={tile} />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <IconButton
              onClick={handlePrevious}
              disabled={currentPageIndex <= 0}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentPageIndex >= pages - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <GazeTracker windowHeight={windowHeight} />
      )}
    </>
  );
};

export default PDFPanel;

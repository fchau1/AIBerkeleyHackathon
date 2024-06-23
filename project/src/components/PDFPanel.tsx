// src/components/PDFReader.js
import React, { useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { TileType } from "../Types";
import Tile from "./Tile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

interface PDFPanelProps {
  extractedText: string;
}

const PDFPanel: React.FC<PDFPanelProps> = ({ extractedText }) => {
  const words = extractedText?.split(" ");


  const tiles: TileType[] = words.map(
    (word): TileType => ({
      coordinates: undefined,
      isHighlighted: true,
      word: word,
      totalWidth: 0,
    })
  );


  return (
    <>
      {/* {isCalibrated ? ( */}
        <div
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
            fontSize: "3.75rem", // equivalent to text-6xl
            border: "2px solid white", // equivalent to border-2 border-white
            textAlign: "left", // equivalent to text-left
            lineHeight: "1.375", // equivalent to leading-snug
            verticalAlign: "middle", // equivalent to align-middle
          }}
        >
          {tiles.map((tile, index) => (
            <Tile key={index} tile={tile} />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <IconButton aria-label="delete">
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
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
          ></div>
        
        
      {/* ): (
        <GazeTracker windowHeight={windowHeight}/>
      )} */}
    </>
  );
};

export default PDFPanel;

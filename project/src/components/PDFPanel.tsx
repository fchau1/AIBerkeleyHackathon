// src/components/PDFReader.js
import React, { useEffect, useRef, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { TileType } from "../Types";
import Tile from "./Tile";

interface PDFPanelProps {
  extractedText: string;
}

const PDFPanel: React.FC<PDFPanelProps> = ({ extractedText }) => {
  const words = extractedText?.split(" ");

  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  const tiles: TileType[] = words.map(
    (word): TileType => ({
      coordinates: undefined,
      isHighlighted: true,
      word: word,
      totalWidth: 0,
    })
  );

  //   console.log("tile", JSON.stringify(tiles, null, 2));

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Calculate width of panel

  //Calculate width of a letter

  //calculate height of tiles

  //break extractedText into an array/hashmap of words

  //for each word in the array/hashmap, calculate the width of the word

  //if the word is less than the remaining space left in the line, add it to the line

  //else: start a new line

  return (
    <div
      className="grid h-full w-7/10 card bg-base-300 rounded-box place-items-center h-90 text-6xl w-15 border-2 border-white text-left leading-snug align-middle gap-2"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        height: `${windowHeight}px`,
      }}
    >
      {tiles.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
      <div className="flex justify-center items-center space-x-4 w-full">
        <button className="btn btn-circle btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="btn btn-circle btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PDFPanel;

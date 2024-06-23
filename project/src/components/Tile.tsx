// src/components/PDFReader.js
import React, { useEffect, useRef } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { TileProps } from "../Types";

const letterWidth = 30;

const Tile: React.FC<TileProps> = ({ tile }) => {

    const tileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(`Rendering Tile for word: "${tile.word}"`);
      if (tileRef.current) {
        const rect = tileRef.current.getBoundingClientRect();
        tile.coordinates = {
          x1: rect.left,
          x2: rect.right,
          y1: rect.top,
          y2: rect.bottom,
        };
        console.log(`Tile coordinates for word "${tile.word}":`, tile.coordinates);
        // console.log(rect.top)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  tile.totalWidth = tile.word.length * letterWidth + letterWidth;

  //calculate height of tiles

  //break extractedText into an array/hashmap of words

  //for each word in the array/hashmap, calculate the width of the word

  //if the word is less than the remaining space left in the line, add it to the line

  //else: start a new line

  return (
    <div
    ref={tileRef}
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: tile.isHighlighted ? "olivedrab" : "",
        // width: tile.totalWidth,
      }}
    >
      {tile.word}
    </div>
  );
};

export default Tile;

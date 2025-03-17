import { ReactNode, useState } from "react";
import MapNode from "./entities/MapNode";
import { css } from "@emotion/react";

export type MapType = ReactNode[][];

export type MapData = {
  map: MapType;
  maxWidth: number;
  maxHeight: number;
};

enum EntityID {
  WALL = "x",
  FLOOR = ".",
}

type MapProps = {
  stage: string[];
  onMapGenerated: (map: MapType) => void;
};

const tileSize = 32;

export default function Map({ stage: stageProp, onMapGenerated }: MapProps) {
  const [mapData] = useState(generateMap(stageProp, onMapGenerated));

  return (
    <div css={style}>
      <svg
        width={mapData.maxWidth * tileSize}
        height={mapData.maxHeight * tileSize}
      >
        {mapData.map}
      </svg>
    </div>
  );
}

function generateMap(
  stage: string[],
  onMapGenerated: (map: MapType) => void
): MapData {
  const map: MapType = [];
  const maxHeight = stage.length;
  let maxWidth = 0;

  for (let rowIndex = 0; rowIndex < stage.length; rowIndex++) {
    const row = stage[rowIndex].split(" ");
    if (row.length > maxWidth) maxWidth = row.length;
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const char = row[colIndex];

      map[rowIndex][colIndex] = (
        <MapNode
          key={`${rowIndex}${colIndex}`}
          dist={Infinity}
          pos={{
            x: tileSize * colIndex,
            y: tileSize * rowIndex,
          }}
          state="unVisited"
          type={char === EntityID.FLOOR ? "floor" : "wall"}
        />
      );
    }
  }
  onMapGenerated(map);
  return { map: map, maxWidth: maxWidth, maxHeight: maxHeight };
}

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: top center;
`;

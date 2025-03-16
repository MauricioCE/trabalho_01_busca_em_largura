import { ReactNode, useState } from "react";
import MapNode from "./entities/MapNode";
import { css } from "@emotion/react";

export type MapData = {
  width: number;
  height: number;
};

enum EntityID {
  WALL = "x",
  FLOOR = ".",
}

type Props = {
  stage: string[];
};

const tileSize = 32;
let width = 0;
let height = 0;

export default function Map({ stage: stageProp }: Props) {
  const [map] = useState(generateMap(stageProp));
  return (
    <div css={style}>
      <svg width={width} height={height}>
        {map}
      </svg>
    </div>
  );
}

function generateMap(stage: string[]): ReactNode[][] {
  const map: ReactNode[][] = [];
  width = tileSize * stage.length;
  height = tileSize * stage.length;
  console.log(stage.length);

  for (let rowIndex = 0; rowIndex < stage.length; rowIndex++) {
    if (map[rowIndex] === undefined) map[rowIndex] = [];
    const rowData = stage[rowIndex].split(" ");

    for (let colIndex = 0; colIndex < rowData.length; colIndex++) {
      const char = rowData[colIndex];

      if (char === " " || !char) continue;
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

  return map;
}

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.5);
  transform-origin: top center;
`;

import { memo } from "react";
import { Vector2 } from "../common/types";
import { useGameStore } from "../stores/mainStore";
import Node from "./Node";
import { css } from "@emotion/react";

const Color = {
  current: "#00a173",
  queued: "#290f8e",
  unVisited: "#0c134f",
  visited: "#0c134f",
  wall: "#20533c",
} as const;

export type TileType = "floor" | "wall";

export type TileState = [
  "current" | "queued" | "unVisited" | "visited",
  "neighbor" | "notNeighbor"
];

export type TileData = {
  coord: Vector2;
  dist: number;
  state: TileState;
  type: TileType;
};

type TileProps = { coord: Vector2 };

function Tile({ coord }: TileProps) {
  const map = useGameStore((state) => state.map);
  const setMap = useGameStore((state) => state.setMap);
  const data = map[coord.x][coord.y];
  const color = data.type === "wall" ? Color["wall"] : Color[data.state[0]];

  function handleClick() {
    const newType = data.type === "floor" ? "wall" : "floor";
    if (newType !== data.type) {
      map[coord.x][coord.y].type = newType;
      setMap([...map]);
    }
  }

  return (
    <Node css={style} coord={coord} onClick={handleClick}>
      <rect id="tile" width="64" height="64" fill={color} />
      {data.state[1] === "neighbor" && (
        <rect
          id="stroke"
          x="2"
          y="2"
          width="60"
          height="60"
          stroke="#259d7b"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeMiterlimit={0}
          strokeLinecap="butt"
          strokeDasharray="8 8"
          fill="none"
        />
      )}
    </Node>
  );
}

const style = css`
  cursor: pointer;
`;

export default memo(Tile);

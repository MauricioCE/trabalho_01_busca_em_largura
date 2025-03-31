import { memo } from "react";
import { Vector2 } from "../../common/types";
import { useGameStore } from "../../stores/mainStore";
import Node from "./Node";

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

type TileProps = TileData;

function Tile({ coord, state, type }: TileProps) {
  const color = type === "wall" ? Color["wall"] : Color[state[0]];
  const map = useGameStore((state) => state.map);
  const triggerUpdate = useGameStore((state) => state.triggerUpdate);

  function handleClick() {
    const newType = type === "floor" ? "wall" : "floor";
    map[coord.x][coord.y].type = newType;
    triggerUpdate(1);
  }

  return (
    <Node coord={coord} onClick={handleClick}>
      <rect id="tile" width="64" height="64" fill={color} />
      {state[1] === "neighbor" && (
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

export default memo(Tile);

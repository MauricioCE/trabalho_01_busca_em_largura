import { Vector2 } from "../../utils/types";
import Node from "./Node";

const Color = {
  current: "#00a173",
  queued: "#7a7788",
  unVisited: "#0c134f",
  visited: "#7a0909",
  wall: "#20533c",
} as const;

type Type = "floor" | "wall";

export type TileState = [
  "current" | "queued" | "unVisited" | "visited",
  "neighbor" | "notNeighbor"
];

export type MapTileData = {
  dist: number;
  coord: Vector2;
  state: TileState;
  type: Type;
};

type TileProps = {
  onTileChange: () => void;
  map: MapTileData[][];
} & MapTileData;

export default function MapTile({
  dist,
  coord,
  state,
  type,
  map,
  onTileChange,
}: TileProps) {
  const color = type === "wall" ? Color["wall"] : Color[state[0]];

  function handleClick() {
    type = type === "floor" ? "wall" : "floor";
    map[coord.x][coord.y] = {
      dist: dist,
      coord: coord,
      state: state,
      type: type,
    };

    onTileChange();
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

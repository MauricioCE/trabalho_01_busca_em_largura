import { MapTileData } from "../components/entities/Tile.tsx";
import { gameConstants } from "./constants.ts";
import { Vector2 } from "./types.ts";

export type MapData = {
  map: MapTileData[][];
  width: number;
  height: number;
  pacmanPos: Vector2;
  ghostPos: Vector2;
};

enum EntityID {
  FLOOR = ".",
  GHOST = "g",
  PACMAN = "p",
  WALL = "x",
}

const tileSize = gameConstants.tileSize;
const tileGap = gameConstants.tileGap;

export default function generateMapData(stage: string[]): MapData {
  const map: MapTileData[][] = [];
  const mapHeight = stage.length;
  let pacmanCoord: Vector2 = { x: -1, y: -1 };
  let ghostCoord: Vector2 = { x: -1, y: -1 };
  let mapWidth = 0;

  for (let rowIndex = 0; rowIndex < stage.length; rowIndex++) {
    const row = stage[rowIndex].split(" ");
    if (row.length > mapWidth) mapWidth = row.length;
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const coord = { x: rowIndex, y: colIndex };
      const char = row[colIndex].toLowerCase();

      if (char === EntityID.PACMAN) {
        pacmanCoord = coord;
      } else if (char === EntityID.GHOST) {
        ghostCoord = coord;
      }

      map[rowIndex].push({
        state: ["unVisited", "notNeighbor"],
        type: char === EntityID.WALL ? "wall" : "floor",
        coord: { x: rowIndex, y: colIndex },
        dist: Infinity,
      });
    }
  }
  return {
    map: map,
    width: mapWidth * tileSize + mapWidth * tileGap,
    height: mapHeight * tileSize + mapHeight * tileGap,
    pacmanPos: pacmanCoord,
    ghostPos: ghostCoord,
  };
}
